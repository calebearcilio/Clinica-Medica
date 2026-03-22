import dayjs from "dayjs";
import z from "zod";

export const createConsultaSchema = z.object({
  dataHora: z.coerce
    .date("Data inválida")
    .refine(
      (date) => dayjs(date).isAfter(dayjs()),
      "Data e hora da consulta devem ser futuras.",
    ),
  pacienteId: z
    .number()
    .int("ID do paciente deve ser um número inteiro.")
    .positive("Escolha um paciente"),
  medicoId: z
    .number()
    .int("ID do médico deve ser um número inteiro.")
    .positive("Escolha um médico"),
  descricao: z
    .string()
    .max(500, "A descrição não pode ter mais de 500 caracteres.")
    .optional(),
});

export const updateConsultaSchema = createConsultaSchema.partial();

export type CreateConsultaData = z.infer<typeof createConsultaSchema>;
export type UpdateConsultaData = z.infer<typeof updateConsultaSchema>;
