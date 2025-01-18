import FormClient from "@/components/custom/FormClient";
import Layout from "@/components/custom/Layout";
import { Button } from "@/components/ui/button";
import { createClient } from "@/services/clients";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ClientCreate = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	const submitClientAndRedirectPage = async (data: CreateClientDto) => {
		try {
			await createClient(data);
			toast("Cliente criado com sucesso.", {
				type: "success",
			});
			navigate("/admin/clients", { replace: true });
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				const errorMessage = error.response?.data?.message || error.message;
				toast(errorMessage, {
					type: "error",
				});
			}
		}
	};

	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<Button variant="outline" onClick={handleGoBack}>
					Voltar
				</Button>
			</div>
			<h2 className="text-xl mb-4 text-center font-bold">
				Adicionar novo cliente
			</h2>

			<FormClient createOrUpdateClient={submitClientAndRedirectPage} />
		</Layout>
	);
};

export default ClientCreate;
