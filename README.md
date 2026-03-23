# Sistema de Gerenciamento de Livros

Sistema para cadastro, visualização, edição e remoção de livros com Backend *(`Node.js + TypeScript + Express.js + Prisma`)* e Frontend *(`Next.js + TypeScript + TailwindCSS`)*.

## Requisitos

- Docker >= v24.0.0
- docker-compose >= v2.20.0
- Plataforma x86_64 

## Executando com Docker (recomendado)

### 1. Copie e configure o arquivo `.env`

```bash
cp .env.example .env
```

O arquivo `.env.example` já vem com valores prontos para uso local. Você pode executar sem alterar nada.

> Caso queira personalizar usuário, senha ou portas, edite o `.env` antes de subir os containers.

### 2. Suba todos os serviços

```bash

docker compose up -d --build
```

### 3. Acesse as aplicações

| Serviço  | URL                       |
|----------|---------------------------|
| Frontend | http://localhost:3000     |


> As migrações do banco de dados são aplicadas automaticamente na inicialização do backend.

---
## Estrutura do Projeto

```
teste_fit/
├── backend/           # API REST (Node.js + Express + Prisma)
├── frontend/          # Interface Web (Next.js)
└── docker-compose.yml # Orquestração dos containers
```

---

## Tecnologias

### Backend
- Node.js + TypeScript
- Express.js
- PostgreSQL + Prisma ORM
- Zod (validação de schemas)
- Multer (upload de imagens)

### Frontend
- Next.js 16 + TypeScript
- TailwindCSS
- Axios

---

## Variáveis de Ambiente

### Docker Compose (raiz do projeto)

```bash
cp .env.example .env
```

| Variável          | Descrição                         | Padrão       |
|-------------------|-----------------------------------|--------------|
| `POSTGRES_USER`   | Usuário do banco de dados         | `postgres`   |
| `POSTGRES_PASSWORD` | Senha do banco de dados         | `postgres`   |
| `POSTGRES_DB`     | Nome do banco de dados            | `livros_db`  |
| `POSTGRES_PORT`   | Porta do PostgreSQL no host       | `5432`       |
| `API_PORT`        | Porta da API no host              | `8000`       |

### Backend (desenvolvimento local)

```bash
cp backend/.env.example backend/.env
```

| Variável       | Descrição                                     |
|----------------|-----------------------------------------------|
| `DATABASE_URL` | Connection string completa do PostgreSQL      |
| `PORT`         | Porta em que o servidor vai escutar           |
| `APP_URL`      | URL base da API (usada nas URLs de imagens)   |

### Frontend (desenvolvimento local)

```bash
cp frontend/.env.example frontend/.env.local
```

| Variável               | Descrição                                   |
|------------------------|---------------------------------------------|
| `NEXT_PUBLIC_API_URL`  | URL base da API acessível pelo navegador    |

---

## Comandos Docker

```bash
# Buildar e subir todos os serviços
docker compose up -d --build

# Apenas subir (imagens já construídas)
docker compose up -d

# Acompanhar logs em tempo real
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f api
docker compose logs -f frontend

# Parar os serviços (mantém os volumes)
docker compose down

# Parar e remover todos os dados (volumes incluídos)
docker compose down -v
```

---

## Executar em Modo de Desenvolvimento (sem Docker)

> Pré-requisito: Node.js >= 20 e um PostgreSQL rodando localmente.

### Backend

```bash
cd backend
npm install
cp .env.example .env   
npx prisma migrate dev
npx prisma generate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   
npm run dev
```
