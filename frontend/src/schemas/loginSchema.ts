import { z } from "zod";

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
	email: z.string().email("Email inválido"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
