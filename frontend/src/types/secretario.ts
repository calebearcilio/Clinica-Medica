export type Secretario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
}

export type CreateSecretarioData = Omit<Secretario, "id">;
export type UpdateSecretarioData = Partial<CreateSecretarioData>;