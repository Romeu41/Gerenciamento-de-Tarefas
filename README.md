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

## 🗄️ Estrutura do Banco de Dados

O banco de dados utilizado é o **MySQL**[cite: 2, 3, 4], contendo as tabelas de usuários, status das tarefas e as tarefas em si[cite: 2, 3, 4]. Você pode executar o script abaixo para criar o banco e as tabelas necessárias:

sql
CREATE DATABASE IF NOT EXISTS gerenciamentodetarefas;
USE gerenciamentodetarefas;

-- 1. Tabela de Usuários
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data_inclusao` datetime DEFAULT CURRENT_TIMESTAMP,
  `senha` varchar(255) NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 2. Tabela de Status das Tarefas
CREATE TABLE `status_tarefas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chave` varchar(50) NOT NULL,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `chave` (`chave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 3. Tabela de Tarefas
CREATE TABLE `tarefas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descricao` text,
  `status_id` int NOT NULL DEFAULT '1',
  `data_vencimento` datetime DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `tarefas_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `status_tarefas` (`id`),
  CONSTRAINT `tarefas_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
