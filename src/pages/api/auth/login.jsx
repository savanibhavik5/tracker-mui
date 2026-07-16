import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getSheetData } from "@/services/googleSheets.service";

const JWT_SECRET = process.env.JWT_SECRET || "tracker-secret-key";

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

    const user = rows.find((row) => row[2] === email || row[4] === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user[3]);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
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

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: payload,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
