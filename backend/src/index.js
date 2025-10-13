import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { testConnection } from './database/configDb.js';
import contatoRoutes from './routes/contatoRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

app.use('/api', contatoRoutes);

app.get('/', (req, res) => {
  res.send('Servidor rodando com CORS habilitado 🚀');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}`);

  testConnection()
    .then(() => console.log('Conexão com o banco testada com sucesso!'))
    .catch((err) =>
      console.error('Erro ao testar conexão com o banco:', err)
    );
});