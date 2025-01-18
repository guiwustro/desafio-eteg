import Layout from "@/components/custom/Layout";
import { Button } from "@/components/ui/button";
import { colorMap } from "@/constants/colorOptions";
import { getClients, removeClient } from "@/services/clients";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataTable } from "./components/DataTable";
import { DialogRemoveClient } from "./components/DialogRemoveClient";

const ClientList = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<Client[]>([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const handleAddClient = () => {
		navigate("/admin/clients/create");
	};

	const handleEdit = (id: string) => {
		navigate(`/admin/clients/update/${id}`);
	};

	const handleRemove = async (id: string) => {
		try {
			await removeClient(id);
			setData((prevData) => prevData.filter((client) => client.id !== +id));
			toast("Cliente deletado com sucesso", {
				type: "success",
			});
		} catch {
			toast("Não foi possível deletar o cliente. Tente novamente mais tarde.", {
				type: "error",
			});
		}
	};

	const columns: ColumnDef<Client>[] = [
		{
			accessorKey: "name",
			header: "Nome",
		},
		{
			accessorKey: "cpf",
			header: "CPF",
		},
		{
			accessorKey: "color",
			header: "Cor Favorita",
			cell: ({ row }) => (
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<span
						style={{
							display: "inline-block",
							width: "10px",
							height: "10px",
							borderRadius: "50%",
							backgroundColor: row.original.color,
						}}
					/>
					<span>{colorMap[row.original.color] || "Cor desconhecida"}</span>
				</div>
			),
		},
		{
			accessorKey: "email",
			header: "E-mail",
		},
		{
			accessorKey: "observations",
			header: "Observações",
		},
		{
			accessorKey: "isActive",
			header: "Status",
			cell: ({ row }) => (
				<div>{row.original.isActive ? "Ativo" : "Inativo"}</div>
			),
		},
		{
			id: "actions",
			header: "Ações",
			cell: ({ row }) => (
				<div className="flex space-x-2">
					<Button
						onClick={() => handleEdit(row.original.id.toString())}
						className="px-2 py-1 bg-blue-500 hover:bg-secondary text-white rounded"
					>
						Editar
					</Button>
					<DialogRemoveClient
						client={row.original}
						handleRemove={handleRemove}
					/>
				</div>
			),
		},
	];

	const getClientsList = async () => {
		setIsLoading(true);
		try {
			const clientsData = await getClients();

			setData(clientsData.data);
			setTotalPages(clientsData.totalPages);
		} catch (error) {
			console.error("Error fetching clients:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	useEffect(() => {
		getClientsList();
	}, []);

	return (
		<Layout>
			<div className="container mx-auto py-10">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold text-textPrimary">
						Lista de Clientes
					</h2>
					<Button
						onClick={handleAddClient}
						className="px-4 py-2 bg-accent text-white rounded-md hover:bg-secondary transition"
					>
						Adicionar Cliente
					</Button>
				</div>
				<DataTable columns={columns} data={data} isLoading={isLoading} />

				{/* Controle de paginação */}
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
