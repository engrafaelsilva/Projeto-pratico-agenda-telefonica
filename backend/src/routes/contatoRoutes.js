import express from 'express';
import{
  addContato,
  listContatos,
  searchContato,
  editContato,
  removeContato
} from '../controller/contatoController.js';

const router = express.Router();

router.post('/criar', addContato);
router.get('/listar', listContatos);
router.get('/buscar', searchContato);
router.put('/editar/:id', editContato);
router.delete('/removercontatos/:id', removeContato);

export default router;