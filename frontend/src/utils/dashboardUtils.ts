import type { Consulta } from "../types/consulta";
import type { Medico } from "../types/medico";
import type { Paciente } from "../types/paciente";
import type { Secretario } from "../types/secretario";

export function amountPacientes(pacientes: Paciente[]): number {
  return pacientes.length;
}

export function amountMedicos(medicos: Medico[]): number {
  return medicos.length;
}

export function amountSecretarios(secretarios: Secretario[]): number {
  return secretarios.length;
}

export function amountConsultas(consultas: Consulta[]): number {
  return consultas.length;
}

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
