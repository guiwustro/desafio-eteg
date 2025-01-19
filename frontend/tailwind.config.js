/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#5170d5",
				secondary: "#60A5FA",
				terciary: "#25bdeb",
				terciaryHover: "#58c5e5",
				accent: "#2563EB",
				background: "#F8FAFC",
				textPrimary: "#78849E",
				textSecondary: "#64748B",
				border: "#CBD5E1",
				highlight: "#cddbe4",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
