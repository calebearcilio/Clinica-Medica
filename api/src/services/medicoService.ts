import { prisma } from "../db/prisma";
import { Medico } from "@prisma/client";
import { CreateMedicoData, UpdateMedicoData } from "../schemas/medicoSchemas";

const medicoService = {
  /**
   * @returns Todas as instâncias de médico do banco de dados.
   */
  async getAll(): Promise<Medico[]> {
    return await prisma.medico.findMany();
  },

  /**
   * @param id ID do médico
   * @returns A instância do médico correspondente ou `null` se não existir
   */
  async getById(id: number): Promise<Medico | null> {
    return await prisma.medico.findUnique({ where: { id } });
  },

  /**
   * Cria um novo médico no banco de dados.
   * @param data Dados do médico a ser adicionado no banco de dados
   * @returns A instância do médico adicionado
   */
  async create(data: CreateMedicoData): Promise<Medico> {
    return await prisma.medico.create({ data: data });
  },

  /**
   * Atualiza os dados de um médico.
   * @param id ID do médico a ser atualizado
   * @param data Dados parciais para atualização
   * @returns A instância do médico atualizado
   */
  async update(id: number, data: UpdateMedicoData): Promise<Medico> {
    return await prisma.medico.update({ where: { id }, data });
  },

  /**
   * Remove um médico do banco pelo ID.
   * @param id ID do médico a ser removido
   * @returns A instância do médico removida
   */
  async remove(id: number): Promise<Medico> {
    return await prisma.medico.delete({ where: { id } });
  },
};
export default medicoService;
