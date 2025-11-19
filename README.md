<p align="center">
  <img src="https://nodejs.org/static/images/logo.svg" width="120" alt="Node Logo" />
  <img src="https://upload.wikimedia.org/logo-react.png" width="120" alt="React Logo" />
</p>

<p align="center"><strong>API REST de Agenda Telefônica</strong> — Gerencie contatos e múltiplos telefones com Node.js, Express e PostgreSQL.</p>

---

## 📞 **Agenda Telefônica – API REST com Node.js, Express e PostgreSQL**

Projeto desenvolvido para aprimorar habilidades em backend, arquitetura limpa, integrações com banco de dados relacional e documentação profissional.

A API permite criar, listar, buscar, editar e remover contatos — cada um podendo possuir múltiplos números de telefone.

---

## 🚀 **Tecnologias Utilizadas**

* Node.js
* Express.js
* PostgreSQL
* node-postgres (pg)
* Swagger UI
* Dotenv
* CORS
* Nodemon

---

## 🧱 **Arquitetura do Projeto**

```
/src
 ├─ controller/   → Validações e respostas HTTP
 ├─ models/       → SQL queries e operações no banco
 ├─ database/     → Conexão com PostgreSQL
 ├─ routes/       → Rotas da API
 ├─ logs/         → Registros de exclusões
 ├─ swagger/      → Configuração do Swagger
 └─ index.js      → Entrada da aplicação
```

---

## 📄 **Funcionalidades**

✔ Criar contatos
✔ Listar contatos
✔ Buscar por nome ou telefone
✔ Editar contato
✔ Remover contato
✔ Registro de logs em arquivo
✔ Documentação completa com Swagger
✔ Validações rígidas de entrada
✔ Uso de transações e rollback

---

## 🗄️ **Estrutura do Banco de Dados**

### **Tabela: contato**

| Campo | Tipo               |
| ----- | ------------------ |
| id    | SERIAL PRIMARY KEY |
| nome  | VARCHAR            |
| idade | INTEGER            |

### **Tabela: telefone**

| Campo     | Tipo         |
| --------- | ------------ |
| idContato | INTEGER (FK) |
| numero    | VARCHAR      |

**Relação 1:N** — um contato pode ter vários números de telefone.

---

## 🛠️ **Como Executar o Projeto**

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
```

### 2. Instale as dependências

```bash
cd backend
npm install
```

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` dentro da pasta `backend`:

```
DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_PORT=5432
DB_DATABASE=seu_banco
PORT=3000
```

**O arquivo `.env` está no .gitignore e não vai para o GitHub.**

### 4. Inicie o servidor

```bash
npm run dev
```

A API estará disponível em:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📘 **Documentação com Swagger**

Acesse em:
👉 **[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)**

Disponível enquanto o servidor estiver rodando.

---

## 🔥 **Endpoints**

| Método | Rota                     | Descrição                        |
| ------ | ------------------------ | -------------------------------- |
| POST   | /api/criarcontato        | Criar contato                    |
| GET    | /api/listar              | Listar contatos                  |
| GET    | /api/buscar?q=valor      | Buscar contato por nome/telefone |
| PUT    | /api/editar/:id          | Editar contato                   |
| DELETE | /api/removercontatos/:id | Remover contato                  |

---

## 🧪 **Exemplo de JSON para criação**

```json
{
  "nome": "João Silva",
  "idade": 28,
  "telefones": ["11988776655", "11944556677"]
}
```

---

## 📁 **Logs**

Operações de exclusão são registradas em:

```
/src/logs/deleteLogs.txt
```

Incluindo:

* Nome
* ID
* Data e horário

---

## 📌 **Próximos Passos**

* Implementar autenticação (JWT)
* Criar frontend completo
* Deploy do backend
* Criar testes automatizados
* Melhorias no Swagger

---
