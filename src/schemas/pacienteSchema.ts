import z from "zod";
import { Paciente } from "../generated/prisma/client";

export const createPacienteSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres.")
    .max(100, "Nome deve ter no máximo 100 caracteres."),
  email: z
    .email({ message: "Email deve ter um formato válido." })
    .max(255, "Email deve ter no máximo 255 caracteres."),
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 caracteres.")
    .regex(/^\d+$/, "CPF deve conter apenas números"),
  dataNascimento: z
    .string()
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Data inválida.")
    .refine((date) => {
      const parsedDate = new Date(date);
      const today = new Date();
      return parsedDate < today;
    }, "Data de nascimento deve estar no passado."),
  telefone: z.string().optional(),
});

export const updatePacienteSchema = createPacienteSchema.partial();

export type CreatePacientedata = z.infer<typeof createPacienteSchema>;
export type UpdatePacientedata = z.infer<typeof updatePacienteSchema>;
