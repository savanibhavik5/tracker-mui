import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({children}){
const router = useRouter();
const [user,setUser]=useState(null);
const [loading,setLoading]=useState(true);

const checkAuth = async()=>{
try{
const response = await axios.get(
"/api/auth/me",
{
withCredentials:true
}
);
if(response.data.success){
setUser(
response.data.user
);
}
}catch(error){
setUser(null);
}finally{
setLoading(false);
}
  };
  
useEffect(()=>{
checkAuth();
},[]);

const login = (data)=>{
setUser(data.user);
router.replace("/dashboard");
};

const logout = async()=>{
try{
await axios.post(
"/api/auth/logout",
{},
{
withCredentials:true
}
);
}catch(error){
console.log(error);
}
setUser(null);
router.replace("/login");
};

return (
<AuthContext.Provider
value={{
user,
loading,
login,
logout,
isAuthenticated:!!user
}}
>
{children}
</AuthContext.Provider>
);
}