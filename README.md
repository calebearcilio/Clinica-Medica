# 🏥 Clínica Médica — Gerencie sua clínica com eficiência e modernidade

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

</div>

---

## 📋 Sobre o Projeto

**Clínica Médica** é um sistema completo de gerenciamento para clínicas médicas, desenvolvido com as tecnologias mais modernas do mercado. A plataforma centraliza todas as operações clínicas — desde o cadastro de pacientes e médicos até o agendamento e controle de consultas — em uma interface intuitiva e segura.

### 💡 O Problema que ele Resolve

Clínicas médicas frequentemente enfrentam desafios como:

- 📂 Controle manual e descentralizado de fichas de pacientes
- 📅 Dificuldade no agendamento e acompanhamento de consultas
- 👨‍⚕️ Falta de visibilidade sobre a agenda e o perfil de cada médico
- 🔐 Ausência de controle de acesso e segurança nos dados sensíveis

O **Clínica Médica** resolve esses problemas oferecendo uma plataforma web centralizada, com autenticação segura, API documentada e interface responsiva — permitindo que secretárias e administradores gerenciem toda a clínica a partir de um único sistema.

---

## 🎬 Demonstração

> 📸 *Placeholder — adicione aqui um GIF ou imagem da aplicação em funcionamento.*

<div align="center">
  <img src="https://via.placeholder.com/900x500?text=Demo+da+Aplicação" alt="Demo da Aplicação" width="900"/>
</div>

---

## ✨ Funcionalidades

- 👩‍💼 **Gestão de Secretários** — Cadastro, autenticação e controle de acesso com JWT
- 👨‍⚕️ **Cadastro de Médicos** — Perfis completos com especialidade e número de CRM
- 🧑‍🤝‍🧑 **Controle de Pacientes** — Registro, edição e histórico de cada paciente
- 📅 **Agendamento de Consultas** — Criação e gestão de consultas com data, hora e observações
- 📖 **API REST documentada** — Documentação interativa via Swagger/OpenAPI em `/api-docs`
- 🔒 **Segurança** — Autenticação JWT, hash de senhas com bcrypt e rate limiting

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologias |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Material-UI, Tailwind CSS, Axios |
| **Backend** | Node.js, Express 5, TypeScript, Zod |
| **Banco de Dados** | PostgreSQL 16, Prisma ORM |
| **Autenticação** | JWT (jsonwebtoken), bcrypt |
| **Infraestrutura** | Docker, Docker Compose |
| **Documentação** | Swagger / OpenAPI |

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [PostgreSQL](https://www.postgresql.org/download/) **ou** [Docker](https://www.docker.com/) (para executar o banco via container)
- [Git](https://git-scm.com/)

---

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/calebearcilio/Clinica-Medica.git
cd Clinica-Medica
```

### 2. Configure as variáveis de ambiente

Copie os arquivos de exemplo e edite com suas configurações:

```bash
# Backend
cp api/.env.exemple api/.env
```

Edite `api/.env` com suas credenciais:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/clinicadb"
DIRECT_URL="postgresql://postgres:SUA_SENHA@localhost:5432/clinicadb"  # Necessário para Supabase com connection pooling
PORT=3000
NODE_ENV="development"
JWT_KEY="sua_chave_jwt_secreta_minimo_32_caracteres"
CORS_ORIGIN="http://localhost:5173"
```

> 💡 **Dica:** Para usar o banco de dados via Docker (sem instalar o PostgreSQL localmente), execute `npm run docker:up` antes de iniciar a API.

### 3. Instale as dependências e configure o banco

```bash
npm run setup
```

> Este comando instala todas as dependências do frontend e backend, gera o Prisma Client e executa as migrations do banco de dados.

### 4. Inicie a aplicação

**Terminal 1 — API (Backend):**

```bash
npm run dev:api
# Disponível em: http://localhost:3000
# Documentação Swagger: http://localhost:3000/api-docs
```

**Terminal 2 — Frontend:**

```bash
npm run dev:frontend
# Disponível em: http://localhost:5173
```

---

## 💻 Exemplo de Uso

### Autenticação de Secretário

```bash
# POST /secretario/login
curl -X POST http://localhost:3000/secretario/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "secretaria@clinica.com",
    "senha": "senha123"
  }'
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "secretario": {
    "id": 1,
    "nome": "Maria Silva",
    "email": "secretaria@clinica.com"
  }
}
```

### Cadastro de Paciente (rota protegida)

```bash
# POST /paciente
curl -X POST http://localhost:3000/paciente \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "nome": "João da Silva",
    "cpf": "123.456.789-00",
    "dataNascimento": "1990-05-15",
    "telefone": "(11) 99999-0000",
    "email": "joao@email.com"
  }'
```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run setup` | Instala todas as dependências e configura o banco |
| `npm run dev:api` | Inicia a API em modo desenvolvimento |
| `npm run dev:frontend` | Inicia o frontend em modo desenvolvimento |
| `npm run build` | Gera os arquivos para produção |
| `npm start:api` | Inicia a API em modo produção |
| `npm run docker:up` | Sobe o banco de dados PostgreSQL via Docker |
| `npm run docker:down` | Para os containers Docker |
| `npm run prisma:generate` | Gera o Prisma Client |
| `npm run prisma:migrate` | Executa as migrations do banco de dados |
| `npm run prisma:studio` | Abre o Prisma Studio (interface visual do banco) |

---

## 👤 Autor

<div align="center">

**Calebe Arcilio**

[![GitHub](https://img.shields.io/badge/GitHub-calebearcilio-181717?style=for-the-badge&logo=github)](https://github.com/calebearcilio)
[![Email](https://img.shields.io/badge/Email-calebearcilio%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:calebearcilio@gmail.com)

</div>

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** — consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

<div align="center">
  Feito com ❤️ por <a href="https://github.com/calebearcilio">Calebe Arcilio</a>
</div>
