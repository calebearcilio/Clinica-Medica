import z from "zod";

// Schema para validação de parâmetros ID
export const idParamSchema = z.object({
  id: z
    .string()
    .transform(Number)
    .pipe(
      z
        .number()
        .int("ID deve ser um número inteiro.")
        .positive("ID deve ser positivo.")
    ),
});

export type IdParam = z.infer<typeof idParamSchema>;
