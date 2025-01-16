import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	preview: {
		port: 3005,
		host: true,
	},
	server: {
		port: 3005,
		strictPort: true,
		host: true,
	},
});
