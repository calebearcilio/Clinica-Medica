import z from "zod";

export const cpfSchema = z.string().nonempty("CPF é obrigratório").transform((value)=> value.replace(/\D/g, ""))

