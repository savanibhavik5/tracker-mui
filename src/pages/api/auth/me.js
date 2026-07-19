import { parse } from "cookie";
import { verifyAccessToken } from "@/lib/auth/jwt";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const cookies = parse(req.headers.cookie || "");

    const accessToken = cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access Token Missing",
      });
    }

    const user = verifyAccessToken(accessToken);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}
