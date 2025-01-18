import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface DialogRemoveClientProps {
	client: Client;
	handleRemove: (id: string) => Promise<void>;
}

export const DialogRemoveClient = ({
	client,
	handleRemove,
}: DialogRemoveClientProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive" className="px-3 py-1">
					Remover
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Confirmação de Exclusão</DialogTitle>
					<DialogDescription className="text-textPrimary">
						Esta ação é irreversível. Você tem certeza de que deseja excluir o
						cliente {client.name}?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
							Cancelar
						</button>
					</DialogClose>

					<Button
						type="submit"
						className="bg-primary hover:bg-accent text-white"
						onClick={() => {
							handleRemove(client.id.toString());
						}}
					>
						Confirmar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
