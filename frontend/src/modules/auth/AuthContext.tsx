import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface AuthContextType {
	user: string | null;
	token: string | null;
	login: (
		username: string,
		password: string
	) => Promise<AxiosResponse | AxiosError>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);

	const retrieveToken = () => {
		const availableToken = localStorage.getItem("token");
		if (availableToken) {
			setToken(availableToken);
		}
	};

	useEffect(() => {
		retrieveToken();
	}, []);

	const login = useCallback(async (username: string, password: string) => {
		try {
			const response = await axios.post<{ token: string }>("/api/auth/login", {
				email: username,
				password,
			});

			const fetchedToken = response.data.token;
			localStorage.setItem("token", fetchedToken); // Token added to local Storage
			setToken(fetchedToken);
			setUser(username);
			return response;
		} catch (error) {
			return error as AxiosError;
		}
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("token");
	}, []);

	const value = { user, token, login, logout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
