export type Paciente = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone?: string;
  dataNascimento: string; // É melhor que seja string do que Date, para evitar de converter Date para string manualmente
}

export type CreatePacienteData = Omit<Paciente, "id">;
export type UpdatePacienteData = Partial<CreatePacienteData>;