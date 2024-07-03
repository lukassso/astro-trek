import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import placeholder from "@/assets/placeholder.svg";

const placeholderImage = placeholder.src;
const RegisterComponent = () => (
	<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
		<div className="flex items-center justify-center py-12">
			<div className="mx-auto grid w-[350px] gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">Register</h1>
					<p className="text-muted-foreground text-balance">
						Enter your information below to create an account
					</p>
				</div>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="name">Name</Label>
						<Input id="name" placeholder="Enter your name" required />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" required />
					</div>
					<Button type="submit" className="w-full">
						Register
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<a href="/signin" className="underline">
						Sign in
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

export default RegisterComponent;
