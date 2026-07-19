import { stringifyCookie } from "cookie";


export function setRefreshTokenCookie(res, token) {


  
  const isProduction =
    process.env.NODE_ENV === "production";


  res.setHeader(
    "Set-Cookie",
    stringifyCookie(
      "refreshToken",
      token,
      {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      }
    )
  );

}



export function clearRefreshTokenCookie(res) {

  res.setHeader(
    "Set-Cookie",
    stringifyCookie(
      "refreshToken",
      "",
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(0),
      }
    )
  );

}