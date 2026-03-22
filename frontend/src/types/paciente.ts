export type Paciente = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone?: string;
  dataNascimento: string; // É melhor que seja string do que Date, para evitar de converter Date para string manualmente
  createdAt: string;
  updatedAt: string;
};

export type CreatePacienteData = Omit<
  Paciente,
  "id" | "createdAt" | "updatedAt"
>;
export type UpdatePacienteData = Partial<CreatePacienteData>;
