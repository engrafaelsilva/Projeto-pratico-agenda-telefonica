import fs from 'fs';
import {
  createContato,
  getContatos,
  searchContatos,
  updateContato,
  deleteContato
} from '../models/contatoModel.js';

export const addContato = async (req, res) => {
  const { nome, idade, telefones } = req.body;
  try {
    const id = await createContato(nome, idade, telefones);
    res.status(201).json({ message: 'Contato criado com sucesso!', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar contato.' });
  }
};

export const listContatos = async (req, res) => {
  try {
    const contatos = await getContatos();
    res.json(contatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar contatos.' });
  }
};

export const searchContato = async (req, res) => {
  const { q } = req.query;
  try {
    const contatos = await searchContatos(q);
    res.json(contatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro na busca de contatos.' });
  }
};

export const editContato = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, telefones } = req.body;
  try {
    await updateContato(id, nome, idade, telefones);
    res.json({ message: 'Contato atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar contato.' });
  }
};

export const removeContato = async (req, res) => {
  const { id } = req.params;
  try {
    const nome = await deleteContato(id);
    if (nome) {
      const logMsg = `[${new Date().toLocaleString()}] Contato "${nome}" (ID ${id}) foi excluído.\n`;
      fs.appendFileSync('./src/logs/deleteLogs.txt', logMsg);
      res.json({ message: 'Contato excluído com sucesso!' });
    } else {
      res.status(404).json({ error: 'Contato não encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir contato.' });
  }
};