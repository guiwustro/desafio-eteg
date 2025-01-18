import { createContext } from "react";

interface IAuthUserProviderData {
	isLoading: boolean;
	loginUser: (user: UserLogin) => void;
	logoutUser: () => void;
}

export const AuthUserContext = createContext({} as IAuthUserProviderData);
