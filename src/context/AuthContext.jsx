import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearAuth = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  setAccessToken(null);
  setUser(null);
};

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const savedAccessToken = localStorage.getItem("accessToken");
// const savedUser = localStorage.getItem("user");

// if (savedAccessToken && savedUser) {
//   try {
//     const decoded = jwtDecode(savedAccessToken);

//     if (decoded.exp * 1000 > Date.now()) {
//       setAccessToken(savedAccessToken);
//       setUser(JSON.parse(savedUser));
//     } else {
//      clearAuth();
//     }
//   } catch {
//     clearAuth();
//   }
// }
//     setLoading(false);
//   }, []);

  useEffect(() => {
  if (typeof window === "undefined") return;

  const savedAccessToken = localStorage.getItem("accessToken");
  const savedUser = localStorage.getItem("user");

  console.log("TOKEN:", savedAccessToken);
  console.log("USER:", savedUser);

  if (savedAccessToken && savedUser) {
    try {

      const decoded = jwtDecode(savedAccessToken);

      console.log("DECODED TOKEN:", decoded);

      if (decoded.exp * 1000 > Date.now()) {

        setAccessToken(savedAccessToken);
        setUser(JSON.parse(savedUser));

      } else {

        console.log("TOKEN EXPIRED");
        clearAuth();

      }

    } catch(error) {

      console.log("JWT ERROR:", error);
      clearAuth();

    }
  }

  setLoading(false);

}, []);
  
const login = ({ accessToken, refreshToken, user }) => {

  if(accessToken){
    localStorage.setItem(
      "accessToken",
      accessToken
    );
  }

  if(refreshToken){
    localStorage.setItem(
      "refreshToken",
      refreshToken
    );
  }

  if(user){
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  }


  setAccessToken(accessToken);
  setUser(user);

  router.replace("/dashboard");
};
const logout = () => {
  clearAuth();
  router.replace("/login");
};

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}