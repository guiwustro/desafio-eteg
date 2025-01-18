import FormErrorMessage from "@/components/custom/FormErrorMessage";
import { Button } from "@/components/ui/button";
import { useAuthUserContext } from "@/contexts/authUser/useAuthUser";
import { LoginFormInputs, loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const FormLogin = () => {
	const { loginUser, isLoading } = useAuthUserContext();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	});

	const onSubmit = (data: LoginFormInputs) => {
		loginUser(data);
	};

	return (
		<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
			<h2 className="mb-6 text-center text-2xl font-bold text-primary">
				Login
			</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-4">
					<label className="block text-sm font-medium text-textPrimary">
						Email
					</label>
					<input
						type="email"
						{...register("email")}
						className={`mt-1 w-full rounded-md border px-3 py-2 text-textPrimary focus:outline-none ${
							errors.email
								? "border-red-500"
								: "border-border focus:border-primary"
						}`}
					/>
					<FormErrorMessage message={errors.email?.message} />
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-textPrimary">
						Senha
					</label>
					<input
						type="password"
						{...register("password")}
						className={`mt-1 w-full rounded-md border px-3 py-2 text-textPrimary focus:outline-none ${
							errors.password
								? "border-red-500"
								: "border-border focus:border-primary"
						}`}
					/>
					<FormErrorMessage message={errors.password?.message} />
				</div>

				<Button
					type="submit"
					disabled={isLoading}
					className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-accent transition-all"
				>
					{isLoading ? "Entrando..." : "Entrar"}
				</Button>
			</form>
		</div>
	);
};

export default FormLogin;
