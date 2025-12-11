import { prisma } from "../db/prisma";
import { Medico } from "@prisma/client";

type MedicoCreateData = Omit<Medico, "id" | "createdAt" | "updatedAt">;
type MedicoUpdateData = Partial<MedicoCreateData>;

const medicoService = {
  async getAll(): Promise<Medico[]> {
    return await prisma.medico.findMany();
  },

  async getById(id: number): Promise<Medico | null> {
    return await prisma.medico.findUnique({ where: { id } });
  },

  async create(data: MedicoCreateData): Promise<Medico> {
    return await prisma.medico.create({ data: data });
  },

  async update(id: number, data: MedicoUpdateData): Promise<Medico> {
    return await prisma.medico.update({ where: { id }, data });
  },

  async remove(id: number): Promise<Medico> {
    return await prisma.medico.delete({ where: { id } });
  },
};
export default medicoService;
