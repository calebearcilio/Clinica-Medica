import { prisma } from "../db/prisma";
import { Medico } from "@prisma/client";

type MedicoCreateData = Omit<Medico, "id" | "createdAt" | "updatedAt">;
type MedicoUpdateData = Partial<MedicoCreateData>;

export const getAll = async (): Promise<Medico[]> => {
  return await prisma.medico.findMany();
};

export const getById = async (id: number): Promise<Medico | null> => {
  return await prisma.medico.findUnique({ where: { id } });
};

export const create = async (data: MedicoCreateData): Promise<Medico> => {
  return await prisma.medico.create({ data: data });
};

export const update = async (
  id: number,
  data: MedicoUpdateData
): Promise<Medico> => {
  return await prisma.medico.update({ where: { id }, data });
};

export const remove = async (id: number): Promise<Medico> => {
  return await prisma.medico.delete({ where: { id } });
};
