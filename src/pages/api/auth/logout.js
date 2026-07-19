// import { serialize } from "cookie";

// export default function handler(req, res) {

//   res.setHeader(
//     "Set-Cookie",
//     serialize("token", "", {
//       httpOnly: true,
//       expires: new Date(0),
//       path: "/",
//     })
//   );

//   return res.status(200).json({
//     success: true,
//     message: "Logout successful",
//   });
// }

import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  res.setHeader("Set-Cookie", [
    serialize("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    }),
    serialize("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    }),
  ]);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}