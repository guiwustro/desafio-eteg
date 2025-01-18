import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	base: "/",
	define: {
		"process.env": process.env,
	},
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
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
