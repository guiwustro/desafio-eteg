import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { createInvite } from "@/services/invites";
import { Link } from "react-router-dom";

interface InviteFormData {
	expirationDate?: string;
	maxUses?: number;
}

export const DialogCreateInvite = () => {
	const [open, setOpen] = useState(false);
	const [invite, setInvite] = useState<Invite | null>(null);
	const [showInviteDialog, setShowInviteDialog] = useState(false);
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<InviteFormData>();

	const onSubmit = async (data: InviteFormData) => {
		const formattedData: InviteFormData = {
			expirationDate: data.expirationDate ? data.expirationDate : undefined,
			maxUses: data.maxUses ? +data.maxUses : undefined,
		};
		const createdInvite = await createInvite(formattedData);

		setOpen(false);
		setInvite(createdInvite);
		const newInviteUrl = `${window.location.origin}/new-client/${createdInvite?.id}`;
		navigator.clipboard.writeText(newInviteUrl);

		reset();
		setShowInviteDialog(true);
	};

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="blueSecondary" className="px-4 py-2 ">
						Gerar convite
					</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="text-textPrimary">
							Criar Convite
						</DialogTitle>
						<DialogDescription className="text-textSecondary">
							Configure os detalhes do convite antes de enviá-lo. Esses campos
							são opcionais.
						</DialogDescription>
					</DialogHeader>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-4"
					>
						<div>
							<label className="text-textPrimary text-sm font-medium">
								Data de Expiração
							</label>
							<input
								type="date"
								{...register("expirationDate")}
								min={tomorrow.toISOString().split("T")[0]}
								className="border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
							/>
						</div>

						<div>
							<label className="text-textPrimary text-sm font-medium">
								Número Máximo de Usos
							</label>
							<input
								type="number"
								{...register("maxUses", { min: 1 })}
								placeholder="Ilimitado"
								className="border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
							/>
							{errors.maxUses && (
								<p className="text-red-500 text-xs mt-1">
									O número deve ser maior que 0.
								</p>
							)}
						</div>

						<DialogFooter>
							<DialogClose asChild>
								<Button
									variant="outline"
									className="bg-gray-500 text-white hover:bg-gray-600"
								>
									Cancelar
								</Button>
							</DialogClose>

							<Button
								type="submit"
								className="bg-primary hover:bg-accent text-white"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Gerando convite..." : "Confirmar"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
				<DialogContent className="sm:max-w-[400px]">
					<DialogHeader>
						<DialogTitle className="font-bold">
							Convite Criado com Sucesso!
						</DialogTitle>
					</DialogHeader>

					<DialogDescription className="text-center">
						<p className="font-bold">
							O convite foi gerado e copiado automaticamente para a área de
							transferência.
						</p>

						<div className="mt-2 text-left flex flex-col gap-1">
							<Link
								to={`/new-client/${invite?.id}`}
								target="_blank"
								className="font-bold text-center text-base"
							>
								Link do Convite
							</Link>{" "}
							<p>
								<strong>Data de Expiração:</strong>{" "}
								{invite?.expirationDate ? invite.expirationDate : "Ilimitado"}
							</p>
							<p>
								<strong>Máximo de Usos:</strong>{" "}
								{invite?.maxUses ? invite.maxUses : "Ilimitado"}
							</p>
						</div>
					</DialogDescription>

					<DialogFooter>
						<DialogClose asChild>
							<Button>Fechar</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
