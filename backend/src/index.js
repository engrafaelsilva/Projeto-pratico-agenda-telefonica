import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { testConnection } from './database/configDb.js';
import contatoRoutes from './routes/contatoRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/api', contatoRoutes);

app.get('/', (req, res) => {
  res.send('Servidor rodando com CORS habilitado 🚀');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

  testConnection()
    .then(() => console.log('Conexão com o banco testada com sucesso!'))
    .catch((err) =>
      console.error('Erro ao testar conexão com o banco:', err)
    );
});