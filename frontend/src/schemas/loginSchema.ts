import z from "zod";

export const loginSchema = z.object({
  email: z.email("Email inválido").min(1, "Email é obrigatório"),
  senha: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .min(1, "Senha é obrigatória"),
});

export type LoginInput = z.infer<typeof loginSchema>;
