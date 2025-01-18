import { api } from "../api";

interface ClientPaginated {
	data: Client[];
	total: number;
	page: number;
	totalPages: number;
}

export const createClient = async (
	clientData: CreateClientDto
): Promise<Client> => {
	const response = await api.post("/clients", clientData);
	return response.data;
};

export const createClientByInvite = async (
	id: string,
	clientData: CreateClientDto
): Promise<Client> => {
	const response = await api.post(`/clients/register/${id}`, clientData);
	return response.data;
};

export const getClients = async (
	page: number = 1,
	limit: number = 20
): Promise<ClientPaginated> => {
	const response = await api.get("/clients", {
		params: { page, limit },
	});
	return response.data;
};

export const getClient = async (id: number): Promise<Client> => {
	const response = await api.get(`/clients/${id}`);
	return response.data;
};

export const updateClient = async (
	id: number,
	clientData: UpdateClientDto
): Promise<Client> => {
	const response = await api.patch(`/clients/${id}`, clientData);
	return response.data;
};

export const removeClient = async (id: string): Promise<void> => {
	await api.delete(`/clients/${id}`);
};
