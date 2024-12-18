import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import placeholder from "@/assets/placeholder.svg";

const placeholderImage = placeholder.src;

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type Inputs = z.infer<typeof schema>;

const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        window.location.href = "/firebase-auth/signin";
      } else {
        console.error("Failed to register");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="dark:text-gray-950"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-sm text-sm text-red-500">{errors.name.message}</span>
                  )}
                </div>
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
                  <Label htmlFor="password">Password</Label>
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
                  Register
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/firebase-auth/signin" className="underline">
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
};

export default RegisterComponent;
