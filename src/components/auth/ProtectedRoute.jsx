import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

import { Box, CircularProgress } from "@mui/material";


export default function ProtectedRoute({ children }) {

const router = useRouter();

const {
 accessToken,
 loading
}=useAuth();



useEffect(()=>{

if(
 !loading &&
 !accessToken &&
 router.pathname !== "/login"
){

router.replace("/login");

}

},[
loading,
accessToken,
router
]);



if(loading){

return (
<Box
sx={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<CircularProgress/>

</Box>
);

}


if(!accessToken){

return null;

}


return children;

}