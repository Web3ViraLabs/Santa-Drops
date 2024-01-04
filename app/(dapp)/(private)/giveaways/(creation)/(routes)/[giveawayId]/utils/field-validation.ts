import * as z from "zod";

export const validateField = (
  fieldName: any,
  value: any,
  schema: any
): { valid: boolean; error: z.ZodError | null } => {
  const fieldSchema = schema.shape[fieldName];
  if (fieldSchema) {
    const result = fieldSchema.safeParse(value);
    return result.success
      ? { valid: true, error: null }
      : { valid: false, error: result.error };
  }
  return { valid: false, error: new z.ZodError([]) }; // Returning an empty ZodError for consistency
};
