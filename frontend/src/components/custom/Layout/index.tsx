import { ReactNode } from "react";
import Header from "../Header";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-grow p-6">{children}</main>
		</div>
	);
};

export default Layout;
