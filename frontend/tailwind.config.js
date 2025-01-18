/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#5170d5",
				secondary: "#60A5FA",
				accent: "#2563EB",
				background: "#F8FAFC",
				textPrimary: "#1E293B",
				textSecondary: "#64748B",
				border: "#CBD5E1",
				highlight: "#cddbe4",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
