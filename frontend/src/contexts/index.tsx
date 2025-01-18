import { ReactNode } from "react";
import AuthUserProvider from "./authUser/authUserProvider";

interface Props {
	children: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
	return <AuthUserProvider>{children}</AuthUserProvider>;
};

export default AppProvider;
