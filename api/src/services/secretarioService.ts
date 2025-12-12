import { prisma } from "../db/prisma";
import { Secretario } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type SecretarioCreateData = Omit<Secretario, "id" | "createdAt" | "updatedAt">;
type SecretarioUpdateData = Partial<SecretarioCreateData>;

const secretarioService = {
  /**
   * @returns Todas as instâncias de secretário do banco
   */
  async getAll(): Promise<Omit<Secretario, "senha">[]> {
    return await prisma.secretario.findMany({
      omit: { senha: true },
    });
  },

  /**
   * @param id ID do secretário
   * @returns A instância do secretário buscado
   */
  async getById(id: number): Promise<Omit<Secretario, "senha"> | null> {
    return await prisma.secretario.findUnique({
      where: { id },
      omit: { senha: true },
    });
  },

  /**
   * @param data Dados completos do secretário que será adicionado no banco
   * @returns Todos os dados, exeto a senha, do secretário criado
   */
  async create(data: SecretarioCreateData): Promise<Omit<Secretario, "senha">> {
    const hashSenha = await bcrypt.hash(data.senha, 10);
    const secretario = await prisma.secretario.create({
      data: { ...data, senha: hashSenha },
    });
    const { senha, ...secretarioSemSenha } = secretario;
    return secretarioSemSenha;
  },

  /**
   * @param id ID do secretário que terá seus dados atualizados
   * @param data Dados do secretário que serão atualizados (todos opcionais)
   * @returns Todos os dados atualizados, exeto a senha, do secretário
   */
  async update(
    id: number,
    data: SecretarioUpdateData
  ): Promise<Omit<Secretario, "senha">> {
    return await prisma.secretario.update({
      where: { id },
      data,
      omit: { senha: true },
    });
  },

  /**
   * @param id ID do secretário que será removido do banco
   * @returns Todos os dados do secretário removido
   */
  async remove(id: number): Promise<Omit<Secretario, "senha">> {
    return await prisma.secretario.delete({
      where: { id },
      omit: { senha: true },
    });
  },

  async login(
    email: string,
    password: string,
    keepLogin: boolean = false
  ): Promise<(Omit<Secretario, "senha"> & { token: string }) | null> {
    const secretario = await prisma.secretario.findUnique({
      where: {
        email,
      },
    });
    if (!secretario) return null;

    const senhaValid = await bcrypt.compare(password, secretario.senha);
    if (!senhaValid) return null;

    const JWT_KEY = process.env.JWT_KEY!;
    const token = jwt.sign(
      {
        id: secretario.id,
        email: secretario.email,
      },
      JWT_KEY,
      { expiresIn: keepLogin ? "30d" : "1d" }
    );

    const { senha, ...secretarioSemSenha } = secretario;
    return { ...secretarioSemSenha, token };
  },
};

export default secretarioService;
