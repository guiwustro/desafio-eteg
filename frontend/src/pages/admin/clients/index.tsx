import Layout from "@/components/custom/Layout";
import { Button } from "@/components/ui/button";
import { getClients } from "@/services/clients";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClientDataTable } from "./components/ClientDataTable";
import { DialogCreateInvite } from "./components/DialogCreateInvite";

const ClientList = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<Client[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		getClientsList();
	}, []);

	const handleAddClient = () => {
		navigate("/admin/clients/create");
	};

	const getClientsList = async (page?: number) => {
		setIsLoading(true);
		try {
			const clientsData = await getClients(page);

			setData(clientsData.data);
			setTotalPages(clientsData.totalPages);
		} catch {
			toast(
				"Não foi possível listar os clientes. Tente novamente mais tarde.",
				{
					type: "error",
				}
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
			getClientsList(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			getClientsList(currentPage - 1);
		}
	};

	return (
		<Layout>
			<div className="container mx-auto py-10">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold text-textPrimary">
						Lista de Clientes
					</h2>
					<div className="flex gap-4">
						<DialogCreateInvite />

						<Button
							onClick={handleAddClient}
							variant="bluePrimary"
							className="px-4 py-2"
						>
							Adicionar Cliente
						</Button>
					</div>
				</div>
				<ClientDataTable setData={setData} data={data} isLoading={isLoading} />

				<div className="flex justify-between items-center mt-4">
					<Button onClick={handlePreviousPage} disabled={currentPage === 1}>
						Anterior
					</Button>
					<span>
						Página {currentPage} de {totalPages}
					</span>
					<Button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
					>
						Próxima
					</Button>
				</div>
			</div>
		</Layout>
	);
};

export default ClientList;
