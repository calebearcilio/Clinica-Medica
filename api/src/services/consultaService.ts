import { prisma } from "../db/prisma";
import { Consulta } from "@prisma/client";
import {
  CreateConsultaData,
  UpdateConsultaData,
} from "../schemas/consultaSchema";
import pacienteService from "./pacienteService";
import medicoService from "./medicoService";

const consultaService = {
  /**
   * Retorna todas as consultas, incluindo dados resumidos de paciente e médico.
   * Os campos `id`, `createdAt` e `updatedAt` de `paciente` e `medico` são omitidos.
   * @returns Lista de consultas com relações incluídas
   */
  async getAll() {
    return prisma.consulta.findMany({
      include: {
        paciente: { omit: { id: true, createdAt: true, updatedAt: true } },
        medico: { omit: { id: true, createdAt: true, updatedAt: true } },
      },
    });
  },

  /**
   * Busca uma consulta pelo ID, incluindo `paciente` e `medico` completos.
   * @param id ID da consulta
   * @returns A consulta encontrada ou `null` se inexistente
   */
  async getById(id: number) {
    return prisma.consulta.findUnique({
      where: { id },
      include: { paciente: true, medico: true },
    });
  },

  /**
   * Cria uma nova consulta.
   * Valida se `pacienteId` e `medicoId` existem antes de criar.
   * Converte `dataHora` (string) para `Date`.
   * @param data Dados da consulta a ser criada
   * @throws Error se paciente ou médico não forem encontrados
   * @returns A instância da consulta criada
   */
  async create(data: CreateConsultaData): Promise<Consulta> {
    const { pacienteId, medicoId } = data;

    // Verificando se paciente existe no banco de dados
    const paciente = pacienteService.getById(pacienteId);
    if (!paciente) {
      throw new Error("Paciente da consulta não encontrado.");
    }

    // Verificando se médico existe no banco de dados
    const medico = medicoService.getById(medicoId);
    if (!medico) {
      throw new Error("Médico da consulta não encontrado.");
    }

    return prisma.consulta.create({
      data: { ...data, dataHora: new Date(data.dataHora) },
    });
  },

  /**
   * Atualiza os dados de uma consulta.
   * Se `data.dataHora` for informada, converte de string para `Date`.
   * @param id ID da consulta a ser atualizada
   * @param data Dados parciais para atualização
   * @returns A instância da consulta atualizada
   */
  async update(id: number, data: UpdateConsultaData): Promise<Consulta> {
    return prisma.consulta.update({
      where: { id },
      data: {
        ...data,
        dataHora: data.dataHora ? new Date(data.dataHora) : undefined,
      },
    });
  },

  /**
   * Remove uma consulta pelo ID.
   * @param id ID da consulta a ser removida
   * @returns A instância da consulta removida
   */
  async remove(id: number): Promise<Consulta> {
    return prisma.consulta.delete({ where: { id } });
  },
};

export default consultaService;
