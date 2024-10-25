import { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface IMessageType {
	type: "success" | "error";
	text: string;
}

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState<IMessageType>();
	const { login } = useAuth();
	const navigate = useNavigate();

	const signIn = async (e: any) => {
		e.preventDefault();
		const response = await login(username, password);
		if (response.status === 200) {
			setMessage({
				type: "success",
				text: "Login Successful. Redirecting...",
			});
			setTimeout(() => {
				navigate("/");
			}, 2000);
		} else if (response instanceof AxiosError) {
			setMessage({
				type: "error",
				text: response.response?.data
					? (response?.response?.data as any)?.message
					: "Something went wrong",
			});
		}
	};

	return (
		<div className="max-w-md m-auto mt-24">
			<div className="relative flex flex-col bg-white shadow-sm border border-slate-200 w-96 rounded-lg my-6">
				<div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
					<h3 className="text-2xl">Sign In</h3>
				</div>
				<div className="flex flex-col gap-4 p-6">
					<div className="w-full max-w-sm min-w-[200px]">
						<label className="block mb-2 text-sm text-slate-600">Email</label>
						<input
							type="email"
							className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
							placeholder="Your Email"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className="w-full max-w-sm min-w-[200px]">
						<label className="block mb-2 text-sm text-slate-600">
							Password
						</label>
						<input
							type="password"
							className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
							placeholder="Your Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="inline-flex items-center mt-2">
						<label className="flex items-center cursor-pointer relative">
							<input
								type="checkbox"
								className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
								id="check-2"
							/>
							<span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-3.5 w-3.5"
									viewBox="0 0 20 20"
									fill="currentColor"
									stroke="currentColor"
									strokeWidth="1">
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"></path>
								</svg>
							</span>
						</label>
						<label className="cursor-pointer ml-2 text-slate-600 text-sm">
							Remember Me
						</label>
					</div>
				</div>

				<div className="px-6 pb-3">
					{message && (
						<div
							className={`text-white p-2 rounded-md ${
								message.type === "success" ? "bg-green-500" : "bg-red-500"
							}`}>
							{message?.text}
						</div>
					)}
				</div>
				<div className="p-6 pt-0">
					<button
						className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="submit"
						onClick={signIn}>
						Sign In
					</button>
					<p className="flex justify-center mt-6 text-sm text-slate-600">
						Don&apos;t have an account?
						<Link
							to="/create-user"
							className="ml-1 text-sm font-semibold text-slate-700 underline">
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
