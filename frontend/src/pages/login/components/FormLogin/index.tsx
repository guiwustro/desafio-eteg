import FormGroup from "@/components/custom/FormGroup";
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
				<FormGroup
					label="Email"
					type="email"
					register={register}
					registerName="email"
					messageError={errors.email?.message}
				/>

				<FormGroup
					label="Senha"
					type="password"
					register={register}
					registerName="password"
					messageError={errors.password?.message}
				/>

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
