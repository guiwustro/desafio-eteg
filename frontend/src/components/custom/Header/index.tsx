import { Button } from "@/components/ui/button";
import { useAuthUserContext } from "@/contexts/authUser/useAuthUser";

const Header = () => {
	const { logoutUser } = useAuthUserContext();
	return (
		<header className="bg-primary text-background py-4 px-6 flex justify-between items-center shadow-md">
			<h1 className="text-xl font-bold text-background w-60">Admin</h1>
			<nav className="flex items-center justify-between w-full">
				<ul className="flex gap-4">
					<li>
						<a
							href="/admin/clients"
							className="text-white hover:text-highlight transition"
						>
							Clientes
						</a>
					</li>
					<li>
						<a
							href="/admin/invites"
							className="text-white hover:text-highlight transition"
						>
							Convites
						</a>
					</li>
				</ul>
				<Button
					onClick={logoutUser}
					className="bg-accent text-white px-4 py-2 rounded-md hover:bg-secondary transition"
				>
					Logout
				</Button>
			</nav>
		</header>
	);
};

export default Header;
