```markdown
## Configuração Completa do Ambiente (Backend, Frontend e Tokens)

Para garantir que qualquer pessoa consiga rodar a aplicação por completo, a seção do seu `README.md` com as variáveis de ambiente e a inicialização de tokens deve incluir tanto o backend quanto o frontend:

```markdown
## Como Executar o Projeto

### Pré-requisitos
* Node.js instalado na máquina.
* Servidor MySQL rodando localmente.

### 1. Configuração do Backend
Crie um arquivo `.env` na pasta raiz do backend contendo as credenciais de banco de dados e a chave para geração de tokens JWT:

```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=gerenciamento_de_tarefas
DB_PORT=3306
JWT_SECRET=sua_chave_secreta_super_segura

```

Para rodar o backend:

```bash
cd backend
npm install
npm run dev

```

### 2. Configuração do Frontend

O frontend precisa saber onde se comunicar com a API do backend. Crie um arquivo `.env` na raiz da pasta do frontend:

```env
VITE_API_URL=http://localhost:3000

```

*(Nota: Se estiver usando Create React App, utilize `REACT_APP_API_URL=http://localhost:3000`)*

Para rodar o frontend:

```bash
cd frontend
npm install
npm run dev

```

### Autenticação e Tokens

A aplicação utiliza **JWT (JSON Web Token)** para autenticação de rotas protegidas:

1. Após realizar o login ou cadastro pelo frontend, o token gerado pelo backend é armazenado automaticamente no `localStorage` do navegador.
2. Todas as requisições subsequentes para rotas privadas enviam esse token de forma automática através do cabeçalho de autorização (`Authorization: Bearer <token>`).

```

```
