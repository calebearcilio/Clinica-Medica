import type { Medico } from "./medico";
import type { Paciente } from "./paciente";

export type Consulta = {
  id: number;
  dataHora: string;
  descricao?: string;
  pacienteId: number;
  medicoId: number;
  paciente: Omit<Paciente, "id">;
  medico: Omit<Medico, "id">;
}

export type CreateConsultaData = Omit<Consulta, "id" | "paciente" | "medico">;
export type UpdateConsultaData = Partial<CreateConsultaData>;