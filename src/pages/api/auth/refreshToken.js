import { parse } from "cookie";
import { verifyRefreshToken, generateAccessToken } from "@/lib/auth/jwt";

export default async function handler(req, res) {
  console.log("LOGIN BODY:", req.body);
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const cookies = parse(req.headers.cookie || "");

    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token Missing",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken({
      userUUID: decoded.userUUID,
    });

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid Refresh Token",
    });
  }
}
