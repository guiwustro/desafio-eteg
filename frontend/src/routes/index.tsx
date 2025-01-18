import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import Login from "../pages/login";
import ClientList from "@/pages/admin/clients";
import ClientCreate from "@/pages/admin/clients/create";
import ClientUpdate from "@/pages/admin/clients/update";

export const AppRoutes = () => {
	const token = localStorage.getItem("@desafio-eteg-token");

	return (
		<Routes>
			<Route
				path="/login"
				element={token ? <Navigate to="/admin/clients" replace /> : <Login />}
			/>
			<Route path="/new-client/:uuid" />

			<Route element={<ProtectedRoute />}>
				<Route path="/admin/clients" element={<ClientList />} />
				<Route path="/admin/clients/create" element={<ClientCreate />} />
				<Route path="/admin/clients/update/:id" element={<ClientUpdate />} />
				<Route path="/admin/invites" />
			</Route>

			{/* <Route path="*" element={<NotFound />} /> */}
		</Routes>
	);
};
