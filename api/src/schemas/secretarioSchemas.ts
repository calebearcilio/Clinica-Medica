import z from "zod";

export const createSecretarioSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres.")
    .max(100, "Nome deve ter no máximo 100 caracteres."),
  email: z
    .email("Email deve ter um formato válido.")
    .max(255, "Email deve ter no máximo 255 caracteres."),
  senha: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres.")
    .max(100, "Senha deve ter no máximo 100 caracteres."),
  telefone: z
    .string()
    .min(11, "Telefone deve ter pelo menos 11 caracteres.")
    .max(19, "Telefone deve ter no máximo 19 caracteres.")
    .optional(),
});

export const loginSecretarioSchema = z.object({
  email: z.email("Email inválido").min(1, "Email é obrigatório"),
  senha: z
    .string("Senha inválida")
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  keepLogin: z.boolean().optional().default(false),
});

export const updateSecretarioSchema = createSecretarioSchema.partial();

export type CreateSecretarioData = z.infer<typeof createSecretarioSchema>;
export type UpdateSecretarioData = z.infer<typeof updateSecretarioSchema>;
