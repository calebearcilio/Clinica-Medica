# Clinica-Medica

Esse é um projeto para gerenciamento de uma clínica médica (médicos, pacientes, consultas e secretários). Este repositório contém uma API em TypeScript usando Express e Prisma para persistência em PostgreSQL.

## Dependências

- [Node.js](https://nodejs.org/en/download)
- [PostgreSQL](https://www.postgresql.org/download/)
- variáveis de ambiente definidas

## Instalação e setup (para desenvolvimento)

1. clone o repositório:

```bash
git clone https://github.com/calebearcilio/Clinica-Medica.git
```

2. configure as variáveis de ambiente:

``` env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/clinicadb"
PORT=3000
```

3. instale as dependências:

```Bach
npm run setup
```

4. Inicie o servidor:

```Bach
npm run dev
```

## Scripts disponíveis

- `npm run dev` — inicia a API em modo desenvolvimento
- `npm run build` — compila TypeScript para `dist/`
- `npm start` — executa `node dist/server.js` (usado após `npm run build`)
- `npm run prisma:generate` — gera o Prisma Client
- `npm run prisma:migrate` — executa migrations e aplica mudanças no banco
- `npm run prisma:studio` — abre o Prisma Studio
- `npm run setup` — instala dependências e executa generate + migrate
