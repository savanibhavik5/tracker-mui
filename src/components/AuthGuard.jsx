import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";


const PUBLIC_ROUTES=[
"/login",
"/signup",
"/forgot-password"
];

export default function AuthGuard({ children }) {
const router=useRouter();
const {
user,
loading
}=useAuth();

useEffect(()=>{
if(
!loading &&
!user &&
!PUBLIC_ROUTES.includes(router.pathname)
){
router.replace("/login");
}
},[
loading,
user,
router
]);

if(loading){
return null;
}
return children;
}