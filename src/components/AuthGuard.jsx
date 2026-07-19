import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return null;
  }

  return children;
}
