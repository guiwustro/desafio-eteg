import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";

import { Button } from "@/components/ui/button";
import { colorOptions } from "@/constants/colorOptions";
import { clientSchema, TClientSchema } from "@/schemas/clientSchema";
import { formatCpf } from "@/utils/formatCpf";
import { CustomSelect } from "../CustomSelect";
import FormErrorMessage from "../FormErrorMessage";
import FormGroup from "../FormGroup";

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
	} = useForm<TClientSchema>({
		resolver: zodResolver(clientSchema),
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

	const onSubmit = (data: TClientSchema) => {
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
			<FormGroup
				label="Nome"
				type="text"
				register={register}
				registerName="name"
				messageError={errors.name?.message}
			/>

			<FormGroup
				label="Email"
				type="email"
				register={register}
				registerName="email"
				messageError={errors.name?.message}
			/>

			<div className="mb-4">
				<label className="text-sm font-medium text-textPrimary" htmlFor="cpf">
					CPF:
				</label>
				<InputMask
					id="cpf"
					mask="999.999.999-99"
					{...register("cpf")}
					className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary"
				/>
				<FormErrorMessage message={errors.cpf?.message} />
			</div>

			<div className="mb-4">
				<label htmlFor="color" className="text-sm font-medium text-textPrimary">
					Cor favorita:
				</label>
				<Controller
					name="color"
					control={control}
					render={({ field }) => (
						<CustomSelect value={field.value} onChange={field.onChange} />
					)}
				/>

				<FormErrorMessage message={errors.color?.value?.message} />
			</div>

			<div className="mb-4">
				<label className="block text-[#78849E] font-semibold">
					Observações:
				</label>
				<textarea
					{...register("observations")}
					className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary"
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
							className="h-5 w-5 text-primary focus:ring-primary"
						/>
						<span className="ml-2">{status ? "Ativo" : "Inativo"}</span>
					</label>
				</div>
			)}

			<Button
				type="submit"
				className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md font-semibold w-full"
			>
				{initialData ? "Atualizar" : "Criar"}
			</Button>
		</form>
	);
};

export default FormClient;
