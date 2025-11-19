# Projeto Clinica Medica

Projeto de um sistema de gerenciamente de uma clínica médica, usando as tecnologias mais usadas no mercado

## Funcionalidades (até agora)

## Backend

- ✅ Gerenciar secretários
- ✅ Cadastro e gestão de médicos com especialidades
- ✅ Controle completo de pacientes
- ✅ Gerenciamento de consultas
- ✅ API REST documentada com Swagger

## Dependências

- [Node.js](https://nodejs.org/en/download)
- [PostgreSQL](https://www.postgresql.org/download/)
- variáveis de ambiente definidas no arquivo .env, siga como exemplo o arquivo [.env.exemple](.env.exemple)

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

- `npm run dev:api` — inicia a API em modo desenvolvimento
- `npm run dev:frontend` — inicia o frontend em modo desenvolvimento
- `npm run build` — gera os arquivos para produção
- `npm start:api` — inicia a API em modo produção
- `npm run prisma:generate` — gera o Prisma Client
- `npm run prisma:migrate` — executa migrations e aplica mudanças no banco
- `npm run prisma:studio` — abre o Prisma Studio
- `npm run setup` — instala todas as dependências
