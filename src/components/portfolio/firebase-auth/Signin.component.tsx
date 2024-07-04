import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, Chrome } from "lucide-react";
import placeholder from "@/assets/placeholder.svg";

const placeholderImage = placeholder.src;
const SigninComponent = () => {
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
						<form id="login-form" action="/api/auth/signin" method="post">
							<div className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										required
										className="dark:text-gray-950"
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<a href="#" className="ml-auto inline-block text-sm underline">
											Forgot your password?
										</a>
									</div>
									<Input id="password" type="password" required className="dark:text-gray-950" />
								</div>
								<Button type="submit" className="w-full">
									Login
								</Button>
							</div>
						</form>
						{/* TODO: These button section is pushing the main layout container */}
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
