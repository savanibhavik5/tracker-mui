import { useRouter } from "next/router";
import { useEffect } from "react";

const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];

export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !PUBLIC_ROUTES.includes(router.pathname)) {
      router.replace("/login");
    }
  }, [router]);

  return children;
}