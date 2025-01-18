interface UserLogin {
	email: string;
	password: string;
}

interface LoginResponse {
	data: {
		token: string;
	};
}
