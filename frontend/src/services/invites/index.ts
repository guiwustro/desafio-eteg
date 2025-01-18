import { api } from "../api";

export const createInvite = async (
	inviteData: CreateInviteDto
): Promise<Invite> => {
	const response = await api.post("/invites", inviteData);
	return response.data;
};

export const getInvites = async (): Promise<Invite[]> => {
	const response = await api.get("/invites");
	return response.data;
};

export const getInviteCheck = async (id: string): Promise<Invite> => {
	const response = await api.get(`/invites/${id}/check`);
	return response.data;
};
