import z from "zod";

export const createMedicoSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres.")
    .max(100, "Nome deve ter no máximo 100 caracteres."),
  email: z
    .email("Email deve ter um formato válido.")
    .max(255, "Email deve ter no máximo 255 caracteres."),
  crm: z
    .string()
    .min(4, "CRM deve ter pelo menos 4 caracteres")
    .max(20, "CRM deve ter no máximo 20 caracteres")
    .regex(/^\d+$/, "CRM deve conter apenas números"),
  especialidade: z
    .string()
    .min(2, "Especialidade deve ter pelo menos 2 caracteres")
    .max(100, "Especialidade deve ter no máximo 100 caracteres"),
  telefone: z
    .string()
    .min(11, "Telefone deve ter pelo menos 11 caracteres.")
    .max(19, "Telefone deve ter no máximo 19 caracteres.")
    .optional(),
});

export const updateMedicoSchema = createMedicoSchema.partial();

export type CreateSecretarioData = z.infer<typeof createMedicoSchema>;
export type UpdateSecretarioData = z.infer<typeof updateMedicoSchema>;
