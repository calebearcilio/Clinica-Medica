import { prisma } from "../db/prisma";
import { Paciente } from "@prisma/client";
import {
  CreatePacientedata,
  UpdatePacientedata,
} from "../schemas/pacienteSchema";

const pacienteService = {
  /**
   * @returns Todas as instâncias de paciente do banco de dados.
   */
  async getAll(): Promise<Paciente[]> {
    return await prisma.paciente.findMany();
  },

  /**
   * @param id ID do paciente
   * @returns A instância do paciente correspondente ou `null` se não existir
   */
  async getById(id: number): Promise<Paciente | null> {
    return await prisma.paciente.findUnique({ where: { id } });
  },

  /**
   * Cria um novo paciente no banco.
   * Converte `dataNascimento` (string) para `Date` antes de persistir.
   * @param data Dados do paciente a ser adicionado no banco de dados
   * @returns A instância do paciente adicionado
   */
  async create(data: CreatePacientedata): Promise<Paciente> {
    return await prisma.paciente.create({
      data: { ...data, dataNascimento: new Date(data.dataNascimento) },
    });
  },

  /**
   * Atualiza os dados de um paciente.
   * Se `data.dataNascimento` for informada, converte de string para `Date`.
   * @param id ID do paciente a ser atualizado
   * @param data Dados parciais para atualização
   * @returns A instância do paciente atualizada
   */
  async update(id: number, data: UpdatePacientedata): Promise<Paciente> {
    return await prisma.paciente.update({
      where: { id },
      data: {
        ...data,
        dataNascimento: data.dataNascimento
          ? new Date(data.dataNascimento)
          : undefined,
      },
    });
  },

  /**
   * Remove um paciente do banco pelo ID.
   * @param id ID do paciente a ser removido
   * @returns A instância do paciente removida
   */
  async remove(id: number): Promise<Paciente> {
    return await prisma.paciente.delete({ where: { id } });
  },
};

export default pacienteService;
