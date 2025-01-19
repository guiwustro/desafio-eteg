import { Button } from "@/components/ui/button";
import { useAuthUserContext } from "@/contexts/authUser/useAuthUser";
import { Link } from "react-router-dom";

const Header = () => {
	const { logoutUser } = useAuthUserContext();
	return (
		<header className="bg-textSecondary text-background py-4 px-6 flex justify-between items-center shadow-md">
			<h1 className="text-xl font-bold text-background w-60">Admin</h1>
			<nav className="flex items-center justify-between w-full">
				<ul className="flex gap-4">
					<li>
						<Link
							to="/admin/clients"
							className="text-white hover:text-highlight transition"
						>
							Clientes
						</Link>
					</li>
				</ul>
				<Button onClick={() => logoutUser()} variant="secondary">
					Logout
				</Button>
			</nav>
		</header>
	);
};

export default Header;
