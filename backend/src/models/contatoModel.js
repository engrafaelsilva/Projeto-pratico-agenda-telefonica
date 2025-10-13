import pool  from '../database/configDb.js';

export const createContato = async (nome, idade, telefones) =>{
  if (typeof nome !== 'string' || !nome.trim()) throw new Error('Nome inválido');

  const idadeNum = Number(idade);

  if (!Number.isFinite(idadeNum) || idadeNum <= 0) throw new Error('Idade inválida');
  if (!Array.isArray(telefones) || telefones.length === 0) throw new Error('Telefones inválidos');

  const telefonesClean = telefones.map((t) => String(t).replace(/\D/g, '')).filter((t) => t.length > 0);
  if (telefonesClean.length === 0) throw new Error('Nenhum telefone válido informado');

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const contatoResult = await client.query(
      'INSERT INTO contato (nome, idade) VALUES ($1, $2) RETURNING id',
      [nome.trim(), idadeNum]
    );
    const contatoId = contatoResult.rows[0]?.id;
    if (!contatoId) throw new Error('Falha ao inserir contato (id retornado inválido)');

    for (const numero of telefonesClean) {
      await client.query(
        'INSERT INTO telefone (idcontato, numero) VALUES ($1, $2)',
        [contatoId, numero]
      );
    }

    await client.query('COMMIT');
    return contatoId;
  } catch (error) {
    await client.query('ROLLBACK');
    const err = new Error(`createContato error: ${error.message}`);
    err.original = error;
    throw err;
  } finally {
    client.release();
  }
}

export const getContatos = async () => {
  const result = await pool.query(`
    SELECT c.id, c.nome, c.idade, t.numero
    FROM contato c
    LEFT JOIN telefone t ON c.id = t.idcontato
    ORDER BY c.nome;
  `);

  const contatos = {};
  for (const row of result.rows) {
    if (!contatos[row.id]) {
      contatos[row.id] = { id: row.id, nome: row.nome, idade: row.idade, telefones: [] };
    }
    if (row.numero) contatos[row.id].telefones.push(row.numero);
  }

  return Object.values(contatos);
};

export const searchContatos = async (q) => {
  const result = await pool.query(
    `
    SELECT c.id, c.nome, c.idade, t.numero
    FROM contato c
    LEFT JOIN telefone t ON c.id = t.idcontato
    WHERE LOWER(c.nome) LIKE LOWER($1) OR t.numero LIKE $1;
    `,
    [`%${q}%`]
  );

  const contatos = {};
  for (const row of result.rows) {
    if (!contatos[row.id]) {
      contatos[row.id] = { id: row.id, nome: row.nome, idade: row.idade, telefones: [] };
    }
    if (row.numero) contatos[row.id].telefones.push(row.numero);
  }

  return Object.values(contatos);
};

export const updateContato = async (id, nome, idade, telefones) => {
  const telefonesClean = telefones.map((t) => String(t).replace(/\D/g, '')).filter((t) => t.length > 0);
  if (telefonesClean.length === 0) throw new Error('Nenhum telefone válido informado');

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query('UPDATE contato SET nome=$1, idade=$2 WHERE id=$3', [nome, idade, id]);
    await client.query('DELETE FROM telefone WHERE idcontato=$1', [id]);

    for (const numero of telefonesClean) {
      await client.query('INSERT INTO telefone (idcontato, numero) VALUES ($1, $2)', [id, numero]);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const deleteContato = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM telefone WHERE idcontato=$1', [id]);
    const result = await client.query('DELETE FROM contato WHERE id=$1 RETURNING nome', [id]);
    await client.query('COMMIT');
    return result.rows[0]?.nome;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};