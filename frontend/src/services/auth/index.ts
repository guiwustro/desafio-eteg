import { api } from "../api";

export const login = async (clientData: UserLogin): Promise<LoginResponse> => {
	const response = await api.post("/auth/login", clientData);
	return response.data;
};
