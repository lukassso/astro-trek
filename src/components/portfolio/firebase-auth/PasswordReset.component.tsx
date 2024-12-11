import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "@/firebase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;

const PasswordResetComponent = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handlePasswordReset = async (data: ResetPasswordInputs) => {
    const auth = getAuth(app);
    try {
      await sendPasswordResetEmail(auth, data.email);
      setMessage("Password reset email sent!");
    } catch (error) {
      setMessage("Error sending password reset email: " + error);
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-center py-12">
        <Card className="mx-auto w-full max-w-[500px]">
          <CardContent>
            <div className="max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
              <h1 className="text-center text-3xl font-bold">Reset Password</h1>
              <div className="mt-4">
                <form onSubmit={handleSubmit(handlePasswordReset)}>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="dark:text-gray-950"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">{errors.email.message}</span>
                  )}
                  <Button type="submit" className="mt-4 w-full">
                    Send Reset Email
                  </Button>
                </form>
                {message && <p className="mt-4 text-center">{message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-center pb-12">
        <a type="button" className="mt-4 w-full text-center" href="/firebase-auth/signin">
          <Button type="button" className="mt-4 max-w-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Button>
        </a>
      </div>
    </>
  );
};

export default PasswordResetComponent;
