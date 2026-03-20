import { prisma } from "../db/prisma";
import { Paciente } from "@prisma/client";
import { CreatePacientedata, UpdatePacientedata } from "../schemas/pacienteSchema";

const pacienteService = {
  async getAll(): Promise<Paciente[]> {
    return await prisma.paciente.findMany();
  },

  async getById(id: number): Promise<Paciente | null> {
    return await prisma.paciente.findUnique({ where: { id } });
  },

  async create(data: CreatePacientedata): Promise<Paciente> {
    return await prisma.paciente.create({
      data: { ...data, dataNascimento: new Date(data.dataNascimento) },
    });
  },

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

  async remove(id: number): Promise<Paciente> {
    return await prisma.paciente.delete({ where: { id } });
  },
};

export default pacienteService;
