import z from "zod";

export const validateSchema = (data: unknown, schema: z.Schema) => {
  try {
    const validatedData = schema.parse(data);
    return { isValid: true as const, data: validatedData };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = String(issue.path[0]);
        errors[key] = issue.message;
      }
      return { isValid: false as const, errors };
    }
    throw error;
  }
};
