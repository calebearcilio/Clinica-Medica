# Clinica-Medica

Esse é um projeto de exemplo para gerenciamento de uma clínica médica (médicos, pacientes, consultas e secretários). Este repositório contém uma API em TypeScript usando Express e Prisma para persistência em PostgreSQL.

## dependências

- (Node.js)[https://nodejs.org/en/download] v16+ (recomenda-se v18+)
- PostgreSQL rodando e acessível
- variáveis de ambiente definidas

## Instalação e setup (para desenvolvimento)

1. clone o repositório:
```powershell
git clone https://github.com/calebearcilio/Clinica-Medica.git
```

2. configure as variáveis de ambiente:
```
DATABASE_URL="postgresql://postgres:senha@localhost:5432/clinicadb"
PORT=3000
```

3. instale as dependências:
```Bach
npm un dev setup
```
