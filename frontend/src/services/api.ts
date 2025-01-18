import axios from "axios";

export const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 30000,
});

api.interceptors.request.use(async (request) => {
	const token = window.localStorage.getItem("@desafio-eteg-token");
	if (token) {
		request.headers.Authorization = `Bearer ${token}`;
	}
	return request;
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log(`error`, error);
	}
);
