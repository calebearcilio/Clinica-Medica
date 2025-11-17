import z from "zod";

export const createSecretarioSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres.")
    .max(100, "Nome deve ter no máximo 100 caracteres."),
  email: z
    .email({ message: "Email deve ter um formato válido." })
    .max(255, "Email deve ter no máximo 255 caracteres."),
  senha: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres.")
    .max(100, "Senha deve ter no máximo 100 caracteres."),
  telefone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 caracteres.")
    .max(15, "Telefone deve ter no máximo 15 caracteres.")
    .nullable()
    .optional(),
});

export const updateSecretarioSchema = createSecretarioSchema.partial();

export type CreateSecretarioData = z.infer<typeof createSecretarioSchema>;
export type UpdateSecretarioData = z.infer<typeof updateSecretarioSchema>;
