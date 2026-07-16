import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";



export default function SignIn() {
  const router = useRouter();

  const { login, token } = useAuth();

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token, router]);
  return  <AuthLayout title="Welcome Back" subtitle="Login to continue">
      <SignInForm onLogin={login} />
    </AuthLayout>
}
