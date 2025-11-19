import fs from "fs";
import {
  createContato,
  getContatos,
  searchContatos,
  updateContato,
  deleteContato,
} from "../models/contatoModel.js";

export const addContato = async (req, res) => {
  try {
    const { nome, idade, telefones } = req.body;

    if (!nome || !idade) {
      return res.status(400).json({ error: "Nome e idade são obrigatórios." });
    }

    const id = await createContato(nome, idade, telefones);

    console.log(`[OK] Contato criado com sucesso! ID: ${id}`);

    res.status(201).json({
      id,
      nome,
      idade,
      telefones,
    });
  } catch (error) {
    console.error("[ERRO] Falha ao criar contato:", error);
    res.status(500).json({ error: "Erro interno ao criar contato." });
  }
};

export const listContatos = async (req, res) => {
  try {
    const contatos = await getContatos();

    console.log(`[OK] ${contatos.length} contatos listados com sucesso.`);

    res.status(200).json(contatos);
  } catch (error) {
    console.error("[ERRO] Falha ao listar contatos:", error);
    res.status(500).json({ error: "Erro interno ao listar contatos." });
  }
};

export const searchContato = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res
        .status(400)
        .json({ error: "Informe um termo de busca válido!" });
    }

    const contatos = await searchContatos(q);

    console.log(`[OK] Busca concluída: ${contatos.length} resultado(s) para "${q}"`);

    res.status(200).json(contatos);
  } catch (error) {
    console.error("[ERRO] Falha na busca de contatos:", error);
    res.status(500).json({ error: "Erro interno ao buscar contatos." });
  }
};

export const editContato = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, telefones } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID do contato é obrigatório." });
    }

    const atualizado = await updateContato(id, nome, idade, telefones);

    if (!atualizado) {
      res.status(200).json(atualizado);
    }

    console.log(`[OK] Contato ID ${id} atualizado com sucesso.`);

    res.status(200).json({
      id,
      nome,
      idade,
      telefones,
    });
  } catch (error) {
    console.error("[ERRO] Falha ao atualizar contato:", error);
    res.status(500).json({ error: "Erro interno ao atualizar contato." });
  }
};

export const removeContato = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID do contato é obrigatório." });
    }

    const nome = await deleteContato(id);

    if (!nome) {
      return res.status(404).json({ error: "Contato não encontrado." });
    }

    const logDir = "./src/logs";
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

    const logMsg = `[${new Date().toLocaleString()}] Contato "${nome}" (ID ${id}) foi excluído.\n`;
    fs.appendFileSync(`${logDir}/deleteLogs.txt`, logMsg);

    console.log(`[OK] Contato "${nome}" (ID ${id}) excluído com sucesso.`);

    res.status(200).json({ message: "Contato excluído com sucesso!" });
  } catch (error) {
    console.error("[ERRO] Falha ao excluir contato:", error);
    res.status(500).json({ error: "Erro interno ao excluir contato." });
  }
};