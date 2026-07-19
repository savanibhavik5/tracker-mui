import AuthLayout from "@/components/auth/AuthLayout";
import SignUpForm from "@/components/auth/SignUpForm";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import Head from "next/head";

export default function SignUp() {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return null;

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <AuthLayout title="Create Account" subtitle="SignUP to continue">
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
