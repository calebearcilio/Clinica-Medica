export type Medico = {
  id: number;
  nome: string;
  email: string;
  crm: string;
  especialidade: string;
  telefone?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateMedicoData = Omit<Medico, "id" | "createdAt" | "updatedAt">;
export type UpdateMedicoData = Partial<CreateMedicoData>;
