import { prisma } from "../db/prisma";
import { Secretario } from "../generated/prisma/client";
import {
  CreateSecretarioData,
  UpdateSecretarioData,
} from "../schemas/validations";

export const getAll = async (): Promise<Secretario[]> => {
  return await prisma.secretario.findMany();
};

export const getById = async (id: number): Promise<Secretario> => {
  const secretario = await prisma.secretario.findUnique({
    where: { id },
  });

  if (!secretario) {
    throw new Error("Secretário(a) não encontrado(a).");
  }

  return secretario;
};

export const create = async (
  data: CreateSecretarioData
): Promise<Secretario> => {
  return await prisma.secretario.create({ data });
};

export const update = async (
  id: number,
  data: Partial<UpdateSecretarioData>
): Promise<Secretario> => {
  const secretarioExiste = await prisma.secretario.findUnique({
    where: { id },
  });

  if(!secretarioExiste){
    throw new Error("Secretário(a) não encontrado(a).");
  }

  return await prisma.secretario.update({
    where: { id },
    data,
  });
};

export const remove = async (id: number) => {
  const secretarioExiste = await prisma.secretario.findUnique({
    where: { id },
  });

  if(!secretarioExiste){
    throw new Error("Secretário(a) não encontrado(a).");
  }

  return prisma.secretario.delete({ where: { id: id } });
};
