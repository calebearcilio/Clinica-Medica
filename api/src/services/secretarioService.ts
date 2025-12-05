import { prisma } from "../db/prisma";
import { Secretario } from "@prisma/client";
import bcrypt from "bcrypt";

type SecretarioCreateData = Omit<Secretario, "id" | "createdAt" | "updatedAt">;
type SecretarioUpdateData = Partial<SecretarioCreateData>;

export const getAll = async (): Promise<Omit<Secretario, "senha">[]> => {
  return await prisma.secretario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getById = async (
  id: number
): Promise<Omit<Secretario, "senha"> | null> => {
  return await prisma.secretario.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const create = async (
  data: SecretarioCreateData
): Promise<Omit<Secretario, "senha">> => {
  const hashSenha = await bcrypt.hash(data.senha, 10);
  const secretario = await prisma.secretario.create({ data: {...data, senha: hashSenha} });
  const { senha, ...secretarioSemSenha } = secretario;
  return secretarioSemSenha;
};

export const update = async (
  id: number,
  data: SecretarioUpdateData
): Promise<Omit<Secretario, "senha">> => {
  return await prisma.secretario.update({
    where: { id },
    data,
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const remove = async (
  id: number
): Promise<Omit<Secretario, "senha">> => {
  return prisma.secretario.delete({ where: { id } });
};
