import cookie from "cookie";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { getDashboardData } from "@/modules/dashboard/dashboard.repository";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const cookies = cookie.parse(req.headers.cookie || "");

    const accessToken = cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = verifyAccessToken(accessToken);

    const year = Number(req.query.year) || new Date().getFullYear();

    const dashboard = await getDashboardData(user.userUUID);

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
}
