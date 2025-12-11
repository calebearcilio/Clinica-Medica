export type Secretario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
}

export type LoginSecretario = {
  email: string;
  senha: string;
}

