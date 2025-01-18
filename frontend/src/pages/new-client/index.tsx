import FormClient from "@/components/custom/FormClient";
import { createClientByInvite } from "@/services/clients";
import { getInviteCheck } from "@/services/invites";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NewClient = () => {
	const navigate = useNavigate();
	const { uuid } = useParams();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [loadingInvite, setLoadingInvite] = useState(true);

	useEffect(() => {
		const checkInvite = async () => {
			try {
				if (!uuid) {
					navigate("/not-found");
					return;
				}

				await getInviteCheck(uuid);
				setLoadingInvite(false);
			} catch {
				navigate("/not-found");
			}
		};

		checkInvite();
	}, [uuid, navigate]);

	const submitClientAndRedirectPage = async (data: CreateClientDto) => {
		if (!uuid) {
			return;
		}

		try {
			await createClientByInvite(uuid, data);

			setIsSuccess(true);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				const errorMessage = error.response?.data?.message || error.message;
				toast(errorMessage, {
					type: "error",
				});
			}
		}
	};

	if (loadingInvite) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<header className="bg-textSecondary text-background py-4 px-6 flex justify-between items-center shadow-md">
				<h1 className="text-xl font-bold text-background w-60">Cadastro</h1>
			</header>

			{isSuccess ? (
				<div className="flex justify-center mt-4">
					<div className="text-center p-10 bg-green-500 rounded-lg shadow-xl max-w-lg mx-auto">
						<p className="text-3xl font-extrabold text-white">
							Cadastro realizado com sucesso!
						</p>
						<p className="text-xl text-white mt-4 opacity-80">
							Obrigado por se cadastrar!
						</p>
					</div>
				</div>
			) : (
				<div className="mt-5">
					<FormClient createOrUpdateClient={submitClientAndRedirectPage} />
				</div>
			)}
		</div>
	);
};

export default NewClient;
