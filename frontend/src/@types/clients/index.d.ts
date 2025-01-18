interface Client {
	id: number;
	name: string;
	cpf: string;
	email: string;
	color: string;
	isActive: boolean;
	observations?: string;
}

interface CreateClientDto {
	name: string;
	cpf: string;
	email: string;
	color: string;
	isActive?: boolean;
	observations?: string;
}

type UpdateClientDto = Partial<CreateClientDto>;
