import { cpfValidator } from "@/utils/cpfValidator";
import { z } from "zod";

export type TClientSchema = z.infer<typeof clientSchema>;

export const clientSchema = z.object({
	name: z
		.string()
		.nonempty("Campo obrigatório")
		.min(3, "O nome deve ter pelo menos 3 caracteres"),
	cpf: z
		.string()
		.nonempty("Campo obrigatório")
		.refine((cpf) => cpfValidator(cpf), {
			message: "CPF inválido",
		}),
	email: z.string().nonempty("Campo obrigatório").email("Email inválido"),
	color: z.object({
		label: z.string(),
		value: z.string().refine((v) => v != "", {
			message: "Campo obrigatório",
		}),
	}),
	isActive: z.boolean().optional(),
	observations: z.string().optional(),
});
