import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { AuthUserContext } from "./authUserContext";
import { login } from "@/services/auth";

interface IAuthUserProps {
	children: ReactNode;
}

const AuthUserProvider = ({ children }: IAuthUserProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [token, setToken] = useState<string>();

	const navigate = useNavigate();

	const loginUser = (data: UserLogin) => {
		setIsLoading(true);

		login(data)
			.then((res) => {
				window.localStorage.setItem("@desafio-eteg-token", res.token);
				api.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
				setToken(res.token);
				setIsLoading(false);

				navigate("/admin/clients", { replace: true });
			})
			.catch(() => {
				toast.error("Algum dos campos está incorreto");
				setIsLoading(false);
			});
	};

	const logoutUser = () => {
		window.localStorage.removeItem("@desafio-eteg-token");
		api.defaults.headers.common["Authorization"] = null;
		setToken(undefined);
		navigate("/login", { replace: true });
	};

	return (
		<AuthUserContext.Provider
			value={{
				isLoading,
				loginUser,
				logoutUser,
				token,
			}}
		>
			{children}
		</AuthUserContext.Provider>
	);
};

export default AuthUserProvider;
