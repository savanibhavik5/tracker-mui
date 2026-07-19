import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

export default function SignIn() {
  const router = useRouter();

  const { login, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return null; // ya Loader component
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to continue">
      <SignInForm onLogin={login} />
    </AuthLayout>
  );
}
