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
import { useEffect, useRef } from "react";
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

	const googleButtonRef = useRef<HTMLButtonElement>(null);
	const githubButtonRef = useRef<HTMLButtonElement>(null);

	const handleSignIn = async (getCredential: () => Promise<any>) => {
		try {
			const userCredential = await getCredential();
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
			console.error("Error signing in:", error);
		}
	};

	const handleEmailSignIn: SubmitHandler<Inputs> = (data) =>
		handleSignIn(() => signInWithEmailAndPassword(auth, data.email, data.password));

	const handleSignInWithPopup = (provider: AuthProvider) =>
		handleSignIn(() => signInWithPopup(auth, provider));

	useEffect(() => {
		const googleButton = googleButtonRef.current;
		const githubButton = githubButtonRef.current;

		const handleGoogleClick = () => handleSignInWithPopup(new GoogleAuthProvider());
		const handleGithubClick = () => handleSignInWithPopup(new GithubAuthProvider());

		googleButton?.addEventListener("click", handleGoogleClick);
		githubButton?.addEventListener("click", handleGithubClick);

		return () => {
			googleButton?.removeEventListener("click", handleGithubClick);
			githubButton?.removeEventListener("click", handleGithubClick);
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
						<form onSubmit={handleSubmit(handleEmailSignIn)}>
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
							<Button ref={googleButtonRef} type="button" variant="outline" className="w-full">
								<Chrome className="mr-2 h-4 w-4" />
								Login with Google
							</Button>
							<Button ref={githubButtonRef} type="button" variant="outline" className="w-full">
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
