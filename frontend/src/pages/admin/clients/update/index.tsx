import FormClient from "@/components/custom/FormClient";
import Layout from "@/components/custom/Layout";
import { Button } from "@/components/ui/button";
import { getClient, updateClient } from "@/services/clients";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ClientUpdate = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [client, setClient] = useState<Client | null>(null);

	useEffect(() => {
		const fetchClient = async () => {
			if (!id) {
				navigate("/admin/clients");
				return;
			}

			try {
				const data = await getClient(Number(id));
				setClient(data);
			} catch {
				navigate("/admin/clients");
			}
		};

		fetchClient();
	}, [id, navigate]);

	const handleUpdate = async (clientData: UpdateClientDto) => {
		if (!id) return;

		try {
			await updateClient(Number(id), clientData);
			navigate("/admin/clients");
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				const errorMessage = error.response?.data?.message || error.message;
				toast(errorMessage, {
					type: "error",
				});
			}
		}
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	if (!client) return <p>Carregando...</p>;

	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<Button variant="outline" onClick={handleGoBack}>
					Voltar
				</Button>
			</div>
			<h2 className="text-xl mb-4 text-center">
				Atualizando cliente <span className="font-bold">{client.name}</span>
			</h2>

			<FormClient initialData={client} createOrUpdateClient={handleUpdate} />
		</Layout>
	);
};

export default ClientUpdate;
