export type Medico = {
  id: number;
  nome: string;
  email: string;
  crm: string;
  especialidade: string;
  telefone?: string
}

export type CreateMedicoData = Omit<Medico, "id">;
export type UpdateMedicoData = Partial<CreateMedicoData>;