import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, Chrome } from "lucide-react";
import placeholder from "@/assets/placeholder.svg";
import {
	getAuth,
	inMemoryPersistence,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	type AuthProvider,
} from "firebase/auth";
import { useEffect } from "react";
import { app } from "@/firebase/client";

const placeholderImage = placeholder.src;

const schema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type Inputs = z.infer<typeof schema>;

const SigninComponent = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(schema),
	});

	const auth = getAuth(app);
	auth.setPersistence(inMemoryPersistence);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
			const idToken = await userCredential.user.getIdToken();

			const response = await fetch("/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ idToken }),
			});

			if (response.redirected) {
				window.location.assign(response.url);
			} else {
				console.error("Failed to sign in");
			}
		} catch (error) {
			console.error("Error signing in with email and password:", error);
		}
	};

	const handleSignInWithPopup = async (provider: AuthProvider) => {
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const idToken = await user.getIdToken();

			const response = await fetch("/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ idToken }),
			});

			if (response.redirected) {
				window.location.assign(response.url);
			} else {
				console.error("Failed to sign in");
			}
		} catch (error) {
			console.error(`Error signing in with ${provider.providerId.split(".")[0]}:`, error);
		}
	};

	useEffect(() => {
		const googleButton = document.getElementById("google-signin-button");
		const githubButton = document.getElementById("github-signin-button");

		if (googleButton) {
			googleButton.addEventListener("click", () => handleSignInWithPopup(new GoogleAuthProvider()));
		}
		if (githubButton) {
			githubButton.addEventListener("click", () => handleSignInWithPopup(new GithubAuthProvider()));
		}

		return () => {
			if (googleButton) {
				googleButton.removeEventListener("click", () =>
					handleSignInWithPopup(new GoogleAuthProvider()),
				);
			}
			if (githubButton) {
				githubButton.removeEventListener("click", () =>
					handleSignInWithPopup(new GithubAuthProvider()),
				);
			}
		};
	}, []);

	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-muted-foreground text-balance">
							Enter your email below to login to your account
						</p>
					</div>
					<div className="grid gap-4">
						<form onSubmit={handleSubmit(onSubmit)} id="login-form">
							<div className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="text"
										placeholder="m@example.com"
										className="dark:text-gray-950"
										{...register("email")}
									/>
									{errors.email && (
										<span className="text-sm text-red-500">{errors.email.message}</span>
									)}
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<a href="#" className="ml-auto inline-block text-sm underline">
											Forgot your password?
										</a>
									</div>
									<Input
										id="password"
										type="password"
										className="dark:text-gray-950"
										{...register("password")}
									/>
									{errors.password && (
										<span className="text-sm text-red-500">{errors.password.message}</span>
									)}
								</div>
								<Button type="submit" className="w-full">
									Login
								</Button>
							</div>
						</form>
						<div className="flex items-center gap-2">
							<Button id="google-signin-button" type="button" variant="outline" className="w-full">
								<Chrome className="mr-2 h-4 w-4" />
								Login with Google
							</Button>
							<Button id="github-signin-button" type="button" variant="outline" className="w-full">
								<Github className="mr-2 h-4 w-4" />
								Login with Github
							</Button>
						</div>
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<a href="/register" className="underline">
							Sign up
						</a>
					</div>
				</div>
			</div>
			<div className="bg-muted hidden lg:block">
				<img
					src={placeholderImage}
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
};

export default SigninComponent;
