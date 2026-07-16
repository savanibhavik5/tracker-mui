import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) return false;

    return decodedToken.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export default function AuthProvider({ children }) {
  const router = useRouter();
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };
const [user, setUser] = useState(() => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem("user");

    if (!data || data === "undefined") {
      return null;
    }

    return JSON.parse(data);
  } catch (err) {
    console.error("Invalid user in localStorage:", err);
    localStorage.removeItem("user");
    return null;
  }
});

const [token, setToken] = useState(() => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");

  return token && token !== "undefined" ? token : null;
});
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   const storedUser = localStorage.getItem("user");

  //   if (storedToken && storedUser && isTokenValid(storedToken)) {
  //     setToken(storedToken);
  //     setUser(JSON.parse(storedUser));
  //   } else {
  //     clearAuth();
  //   }

  //   setLoading(false);
  // }, []);

  useEffect(() => {
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken.exp) {
        clearAuth();
        router.replace("/login");
        return;
      }

      const expiresAt = decodedToken.exp * 1000;
      const timeout = expiresAt - Date.now();

      if (timeout <= 0) {
        clearAuth();
        router.replace("/login");
        return;
      }

      const timer = window.setTimeout(() => {
        clearAuth();
        router.replace("/login");
      }, timeout);

      return () => window.clearTimeout(timer);
    } catch {
      clearAuth();
      router.replace("/login");
    }
  }, [token, router]);

  const login = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    router.replace("/");
  };

  const logout = () => {
    clearAuth();
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
