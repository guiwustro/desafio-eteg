import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/custom/DataTable";
import { Button } from "@/components/ui/button";
import { colorMap } from "@/constants/colorOptions";
import { removeClient } from "@/services/clients";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DialogRemoveClient } from "../DialogRemoveClient";

interface DataTableProps {
	setData: React.Dispatch<React.SetStateAction<Client[]>>;
	data: Client[];
	isLoading: boolean;
}

export const ClientDataTable = ({
	setData,
	data,
	isLoading,
}: DataTableProps) => {
	const navigate = useNavigate();

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
				<div className="flex gap-4">
					<Button
						variant="bluePrimary"
						onClick={() => handleEdit(row.original.id.toString())}
						className="px-2 py-1"
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

	const handleEdit = (id: string) => {
		navigate(`/admin/clients/update/${id}`);
	};

	return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};
