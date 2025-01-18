import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputMask from "react-input-mask";
import { useState } from "react";

import FormErrorMessage from "../FormErrorMessage";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "../CustomSelect";
import { cpfValidator } from "@/utils/cpfValidator";
import { colorOptions } from "@/constants/colorOptions";
import { formatCpf } from "@/utils/formatCpf";

const formSchema = z.object({
	name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
	cpf: z.string().refine((cpf) => cpfValidator(cpf), {
		message: "CPF inválido",
	}),
	email: z.string().email(),
	color: z.object({ label: z.string(), value: z.string() }),
	isActive: z.boolean().optional(),
	observations: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface FormProps {
	initialData?: Client;
	createOrUpdateClient: (data: CreateClientDto) => Promise<void>;
}

const FormClient: React.FC<FormProps> = ({
	initialData,
	createOrUpdateClient,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialData?.name || "",
			email: initialData?.email || "",
			cpf: initialData?.cpf ? formatCpf(initialData.cpf) : "",
			color: initialData
				? colorOptions.find((c) => c.value === initialData.color)
				: colorOptions[0],
			isActive: initialData?.isActive ?? true,
			observations: initialData?.observations || "",
		},
	});

	const [status, setStatus] = useState(initialData?.isActive ?? true);

	const onSubmit = (data: FormData) => {
		const formattedCpf = data.cpf.replace(/\D/g, "");

		const dataFormatted: CreateClientDto = {
			...data,
			cpf: formattedCpf,
			color: data.color.value,
		};

		createOrUpdateClient(dataFormatted);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md border border-gray-200"
		>
			{/* Nome */}
			<div className="mb-4">
				<label className="block text-[#78849E] font-semibold" htmlFor="name">
					Nome:
				</label>
				<input
					{...register("name")}
					id="name"
					className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1890FF]"
				/>
				<FormErrorMessage message={errors.name?.message} />
			</div>

			<div className="mb-4">
				<label className="block text-[#78849E] font-semibold" htmlFor="email">
					Email:
				</label>
				<input
					{...register("email")}
					id="email"
					className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1890FF]"
				/>
				<FormErrorMessage message={errors.name?.message} />
			</div>

			<div className="mb-4">
				<label className="block text-[#78849E] font-semibold" htmlFor="cpf">
					CPF:
				</label>
				<InputMask
					id="cpf"
					mask="999.999.999-99"
					{...register("cpf")}
					className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1890FF]"
				/>
				<FormErrorMessage message={errors.cpf?.message} />
			</div>

			<div className="mb-4">
				<label htmlFor="color" className="block text-gray-700">
					Cor favorita:
				</label>
				<Controller
					name="color"
					control={control}
					render={({ field }) => (
						<CustomSelect value={field.value} onChange={field.onChange} />
					)}
				/>

				<FormErrorMessage message={errors.color?.message} />
			</div>

			<div className="mb-4">
				<label className="block text-[#78849E] font-semibold">
					Observações:
				</label>
				<textarea
					{...register("observations")}
					className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1890FF]"
				/>
			</div>

			{initialData && (
				<div className="mb-4 flex items-center gap-2">
					<label className="text-[#78849E] font-semibold">Status:</label>
					<label className="flex items-center cursor-pointer">
						<input
							type="checkbox"
							checked={status}
							onChange={() => {
								setStatus(!status);
								setValue("isActive", !status);
							}}
							className="h-5 w-5 text-[#1890FF] focus:ring-[#1890FF]"
						/>
						<span className="ml-2">{status ? "Ativo" : "Inativo"}</span>
					</label>
				</div>
			)}

			{/* Botão de Enviar */}
			<Button
				type="submit"
				className="bg-[#1890FF] hover:bg-[#1073CC] text-white px-4 py-2 rounded-md font-semibold w-full"
			>
				{initialData ? "Atualizar" : "Criar"}
			</Button>
		</form>
	);
};

export default FormClient;
