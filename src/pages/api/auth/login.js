import bcrypt from "bcryptjs";

import {
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/auth/jwt";

import {
  createAccessTokenCookie,
  createRefreshTokenCookie,
} from "@/lib/auth/cookies";

import { getSheetData } from "@/services/googleSheets.service";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const { email, password } = req.body;

    const rows = (await getSheetData("TUsers")).slice(2);

    const user = rows.find((row) => row[2] === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user[3]);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    if (user[6] !== "ACTIVE") {
      return res.status(401).json({
        success: false,
        message: "Account Disabled",
      });
    }

    const payload = {
      userUUID: user[0],
      name: user[1],
      email: user[2],
      mobile: user[4],
      role: user[5],
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    const accessCookie = createAccessTokenCookie(accessToken);

    const refreshCookie = createRefreshTokenCookie(refreshToken);

    res.setHeader("Set-Cookie", [
      accessCookie,
      refreshCookie,
    ]);

    return res.status(200).json({
      success: true,
      user: payload,
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}