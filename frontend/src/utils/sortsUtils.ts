import type { Consulta } from "../types/consulta";
import type { Medico } from "../types/medico";
import type { Paciente } from "../types/paciente";

export function consultasToday(consultas: Consulta[]): Consulta[] | null {
  const today = new Date().toISOString().slice(0, 10);
  return consultas.filter((consulta) => consulta.dataHora.startsWith(today));
}

export function sortConsultasByData(consultas: Consulta[]): Consulta[] {
  return [...consultas].sort(
    (consultaA, consultaB) =>
      new Date(consultaB.dataHora).getTime() -
      new Date(consultaA.dataHora).getTime(),
  );
}

export function sortPacientesByCreateData(pacientes: Paciente[]): Paciente[] {
  return [...pacientes].sort(
    (pacienteA, pacienteB) =>
      new Date(pacienteB.updatedAt).getTime() -
      new Date(pacienteA.updatedAt).getTime(),
  );
}

export function sortMedicosByCreateData(medicos: Medico[]): Medico[] {
  return [...medicos].sort(
    (medicoA, medicoB) =>
      new Date(medicoB.updatedAt).getTime() -
      new Date(medicoA.updatedAt).getTime(),
  );
}
