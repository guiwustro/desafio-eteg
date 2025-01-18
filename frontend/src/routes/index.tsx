import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import ClientList from "@/pages/admin/clients";
import ClientCreate from "@/pages/admin/clients/create";
import ClientUpdate from "@/pages/admin/clients/update";
import NewClient from "@/pages/new-client";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";

export const AppRoutes = () => {
	const token = localStorage.getItem("@desafio-eteg-token");

	return (
		<Routes>
			<Route
				path="/"
				element={token ? <Navigate to="/admin/clients" replace /> : <Login />}
			/>

			<Route
				path="/login"
				element={token ? <Navigate to="/admin/clients" replace /> : <Login />}
			/>

			<Route path="/new-client/:uuid" element={<NewClient />} />

			<Route element={<ProtectedRoute />}>
				<Route path="/admin/clients" element={<ClientList />} />
				<Route path="/admin/clients/create" element={<ClientCreate />} />
				<Route path="/admin/clients/update/:id" element={<ClientUpdate />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
