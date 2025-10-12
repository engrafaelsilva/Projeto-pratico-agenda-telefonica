import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './database/configDb.js'; // note as chaves {}

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);

  testConnection()
    .then(() => console.log('Conexão com o banco testada com sucesso!'))
    .catch((err) => console.error('Erro ao testar conexão com o banco:', err));
});