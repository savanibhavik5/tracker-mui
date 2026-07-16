import { useEffect } from "react";
import { useRouter } from "next/router";

import useAuth from "@/hooks/useAuth";

import { Box, CircularProgress } from "@mui/material";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !token && router.pathname !== "/login") {
      const redirectTimer = window.setTimeout(() => {
        router.replace("/login");
      }, 100);

      return () => window.clearTimeout(redirectTimer);
    }
  }, [loading, token, router]);

  if (loading || !token) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return children;
}