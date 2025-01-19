import { createContext } from "react";

interface IAuthUserProviderData {
	isLoading: boolean;
	token?: string;
	loginUser: (user: UserLogin) => void;
	logoutUser: () => void;
}

export const AuthUserContext = createContext({} as IAuthUserProviderData);
