import z from "zod";

export const loginSchema = z.object({
  email: z.email("Email inválido").nonempty("Campo obrigatório"),
  senha: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .nonempty("Campo obrigatório"),
});

export type LoginInput = z.infer<typeof loginSchema>;
