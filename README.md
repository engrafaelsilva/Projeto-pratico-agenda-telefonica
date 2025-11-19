📞 Agenda Telefônica – API REST com Node.js, Express e PostgreSQL

Este é um projeto pessoal desenvolvido para aprimorar habilidades em backend, boas práticas de arquitetura, validação de dados e integração com banco relacional.
A aplicação consiste em uma API REST para gerenciamento de contatos, onde cada contato pode ter múltiplos números de telefone.

🚀 Tecnologias Utilizadas

Node.js

Express.js

PostgreSQL

node-postgres (pg)

Swagger UI

Dotenv

CORS

Nodemon

🧱 Arquitetura do Projeto
/src
 ├─ controller/   → Lida com validações e respostas HTTP
 ├─ models/       → Querys SQL e operações no banco
 ├─ database/     → Conexão com o PostgreSQL
 ├─ routes/       → Rotas da API
 ├─ logs/         → Registros de operações sensíveis
 ├─ swagger/      → Configuração e definição do Swagger
 └─ index.js      → Entrada da aplicação

📄 Funcionalidades

Criar contatos

Listar contatos

Buscar por nome ou telefone

Editar contato

Remover contato

Registro de logs de exclusão

Documentação completa com Swagger

Validações rígidas de entrada

Uso de transações e rollback no PostgreSQL

🗄️ Estrutura do Banco de Dados
Tabela: contato
Campo	Tipo
id	SERIAL PRIMARY KEY
nome	VARCHAR
idade	INTEGER
Tabela: telefone
Campo	Tipo
idContato	INTEGER (FK)
numero	VARCHAR

Relação 1:N
(um contato pode ter vários números de telefone).

🛠️ Como Executar o Projeto
1. Clone o repositório
git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git

2. Instale as dependências
cd backend
npm install

3. Configure o arquivo .env

Crie um arquivo .env dentro da pasta backend:

DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_PORT=5432
DB_DATABASE=seu_banco
PORT=3000


⚠ O arquivo .env está no .gitignore e não é enviado ao GitHub.

4. Inicie o servidor
npm run dev


A API rodará em:

http://localhost:3000

📘 Documentação (Swagger)

Acesse a documentação completa em:

http://localhost:3000/api-docs/


Disponível enquanto a API estiver rodando localmente.

🔥 Endpoints
Criar contato
POST /api/criarcontato

Listar contatos
GET /api/listar

Buscar contato
GET /api/buscar?q=valor

Editar contato
PUT /api/editar/:id

Remover contato
DELETE /api/removercontatos/:id

🧪 Exemplo de JSON para criação
{
  "nome": "João Silva",
  "idade": 28,
  "telefones": ["11988776655", "11944556677"]
}

📁 Logs

Operações de exclusão são registradas em:

/src/logs/deleteLogs.txt


Incluindo:

Nome

ID

Data e horário

📌 Próximos Passos

Implementar autenticação (JWT)

Criar frontend completo

Deploy do backend

Criar testes automatizados

Melhorias no Swagger
