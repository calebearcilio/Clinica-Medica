import zod from "zod";

export const createSecretarioSchema = zod.object({
  nome: zod
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres.")
    .max(100, "Nome deve ter no máximo 100 caracteres."),
  email: zod
    .string()
    .email({ message: "Email deve ter um formato válido." })
    .max(255, "Email deve ter no máximo 255 caracteres."),
  senha: zod
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres.")
    .max(100, "Senha deve ter no máximo 100 caracteres."),
  telefone: zod
    .string()
    .min(10, "Telefone deve ter pelo menos 10 caracteres.")
    .max(15, "Telefone deve ter no máximo 15 caracteres.")
    .nullable()
    .optional(),
});

export const updateSecretarioSchema = createSecretarioSchema.partial();

// Schema para validação de parâmetros ID
export const idParamSchema = zod.object({
  id: zod
    .string()
    .transform(Number)
    .pipe(
      zod
        .number()
        .int("ID deve ser um número inteiro.")
        .positive("ID deve ser positivo.")
    ),
});

export type CreateSecretarioData = zod.infer<typeof createSecretarioSchema>;
export type UpdateSecretarioData = zod.infer<typeof updateSecretarioSchema>;
export type IdParam = zod.infer<typeof idParamSchema>;
