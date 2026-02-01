import type { Consulta } from "../types/consulta";
import type { Paciente } from "../types/paciente";

export function consultasToday(consultas: Consulta[]): Consulta[] | null {
  const today = new Date().toISOString().slice(0, 10);
  return consultas.filter((consulta) => consulta.dataHora.startsWith(today));
}

export function sortConsultasByData(consultas: Consulta[]): Consulta[] {
  return [...consultas].sort(
    (consultaA, consultaB) =>
      new Date(consultaA.dataHora).getTime() -
      new Date(consultaB.dataHora).getTime()
  );
}

export function sortPacientesByCreateData(pacientes: Paciente[]): Paciente[] {
  return [...pacientes].sort(
    (pacienteA, pacienteB) =>
      new Date(pacienteA.createdAt).getTime() -
      new Date(pacienteB.createdAt).getTime()
  );
}
