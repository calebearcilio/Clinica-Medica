import z from "zod";

export const createConsultaSchema = z.object({
  dataHora: z
    .string()
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Data e hora inválidos.")
    .refine((date) => {
      const parsedDate = new Date(date);
      const today = new Date();
      return parsedDate > today;
    }, "Data e hora da consulta devem ser no futuro."),
  pacienteId: z
    .number()
    .int("ID do paciente deve ser um número inteiro.")
    .positive("ID do paciente deve ser positivo."),
  medicoId: z
    .number()
    .int("ID do médico deve ser um número inteiro.")
    .positive("ID do médico deve ser positivo."),
  descricao: z
    .string()
    .max(500, "A descrição não pode ter mais de 500 caracteres.")
    .optional(),
});

export const updateConsultaSchema = createConsultaSchema.partial();

export type CreateConsultaData = z.infer<typeof createConsultaSchema>
export type UpdateConsultaData = z.infer<typeof updateConsultaSchema>