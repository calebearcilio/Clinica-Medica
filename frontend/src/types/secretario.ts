export type Secretario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
};

export type LoginSecretarioData = {
  email: string;
  senha: string;
  keepLogin: boolean;
};

export type LoginResponse = {
  nome: string;
  email: string;
  telefone?: string;
  token: string;
};
