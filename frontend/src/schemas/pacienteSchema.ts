import z from "zod";

export const createPacienteSchema = z.object({
  nome: z
    .string()
    .max(100, "Nome deve ter no máximo 100 caracteres.")
    .min(1, "Nome ausente."),
  email: z
    .email("Email inválido.")
    .max(255, "Email deve ter no máximo 255 caracteres.")
    .min(1, "Email ausente."),
  cpf: z.string().length(14, "CPF deve ter 11 números.").min(1, "CPF ausente."),
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
    }, "Data de nascimento deve estar no passado.")
    .min(1, "Data de nascimento ausente."),
  telefone: z
    .string()
    .max(19, "Telefone deve conter apenas 13 números")
    .optional(),
});

export const updatePacienteSchema = createPacienteSchema.partial();

export type CreatePacientedata = z.infer<typeof createPacienteSchema>;
export type UpdatePacientedata = z.infer<typeof updatePacienteSchema>;
