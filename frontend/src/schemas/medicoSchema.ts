import z from "zod";

export const createMedicoSchema = z.object({
  nome: z
    .string()
    .max(100, "Nome deve ter no máximo 100 caracteres.")
    .min(3, "Mínimo de 3 caracteres.")
    .nonempty("Nome ausente"),
  email: z
    .email("Email inválido.")
    .max(255, "Email deve ter no máximo 255 caracteres.")
    .nonempty("Email ausente."),
  crm: z
    .string()
    .min(4, "CRM deve ter pelo menos 4 caracteres")
    .max(20, "CRM deve ter no máximo 20 caracteres")
    .refine((value) => {
      return (ufs.includes(value.slice(0, 2)));
    }, "UF inválida")
    .nonempty("CRM ausente"),
  especialidade: z
    .string()
    .min(2, "Especialidade deve ter pelo menos 2 caracteres")
    .max(100, "Especialidade deve ter no máximo 100 caracteres")
    .nonempty("Especialidade ausente"),
  telefone: z
    .string()
    .refine((value) => {
      return !(value && value.length < 19);
    }, "Número de telefone inválido.")
    .optional(),
});

export const updateMedicoSchema = createMedicoSchema.partial();

export type CreateSecretarioData = z.infer<typeof createMedicoSchema>;
export type UpdateSecretarioData = z.infer<typeof updateMedicoSchema>;

const ufs = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];
