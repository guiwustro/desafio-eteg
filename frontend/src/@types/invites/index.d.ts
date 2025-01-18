interface Invite {
	id: string;
	expirationDate: string | null;
	maxUses: number | null;
	currentUses: number;
	createdAt: string;
	updatedAt: string;
}

interface CreateInviteDto {
	expirationDate?: string;
	maxUses?: number;
}
