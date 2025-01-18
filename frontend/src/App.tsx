import { ToastContainer } from "react-toastify";
import AppProvider from "./contexts";
import { AppRoutes } from "./routes";

function App() {
	return (
		<AppProvider>
			<AppRoutes />
			<ToastContainer />
		</AppProvider>
	);
}

export default App;
