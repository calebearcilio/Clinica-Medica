import { prisma } from "../db/prisma";
import { Secretario } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  CreateSecretarioData,
  UpdateSecretarioData,
} from "../schemas/secretarioSchemas";

const BCRYPTSALT = 10;

type SecretarioSemSenha = Omit<Secretario, "senha">;

const secretarioService = {
  /**
   * @returns Todas as instâncias de secretário do banco de dados.
   */
  async getAll(): Promise<SecretarioSemSenha[]> {
    return await prisma.secretario.findMany({
      omit: { senha: true },
    });
  },

  /**
   * @param id ID do secretário
   * @returns A instância do secretário correspondente ou `null` se não existir
   */
  async getById(id: number): Promise<SecretarioSemSenha | null> {
    return await prisma.secretario.findUnique({
      where: { id },
      omit: { senha: true },
    });
  },

  /**
   * Cria um novo secretário no banco.
   * @param data Dados do secretário a ser adicionado no banco de dados
   * @returns A instância do secretário adicionado, omitindo `senha`
   */
  async create(data: CreateSecretarioData): Promise<SecretarioSemSenha> {
    // criptografando senha
    const createData = { ...data };
    createData.senha = await bcrypt.hash(createData.senha, BCRYPTSALT);

    const secretario = await prisma.secretario.create({
      data: createData,
    });

    const { senha, ...secretarioSemSenha } = secretario;
    return secretarioSemSenha;
  },

  /**
   * Atualiza os dados de um secretário.
   * @param id ID do secretário a ser atualizado
   * @param data Dados parciais para atualização
   * @returns A instância do secretário atualizada, omitindo `senha`
   */
  async update(
    id: number,
    data: UpdateSecretarioData,
  ): Promise<SecretarioSemSenha> {
    // criptografando senha
    const updateData = { ...data };
    if (updateData.senha) {
      updateData.senha = await bcrypt.hash(updateData.senha, BCRYPTSALT);
    }

    return await prisma.secretario.update({
      where: { id },
      data: updateData,
      omit: { senha: true },
    });
  },

  /**
   * Remove um secretário do banco pelo ID.
   * @param id ID do secretário a ser removido
   * @returns A instância do secretário removida
   */
  async remove(id: number): Promise<SecretarioSemSenha> {
    return await prisma.secretario.delete({
      where: { id },
      omit: { senha: true },
    });
  },

  /**
   * 
   * @param email Email do secretário
   * @returns A instância do secretário correspondente
   */
  async getByEmail(
    email: string,
  ): Promise<Omit<Secretario, "createdAt" | "updatedAt"> | null> {
    const secretario = await prisma.secretario.findUnique({
      where: {
        email,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    return secretario;
  },
};

export default secretarioService;
