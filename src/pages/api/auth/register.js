import bcrypt from "bcryptjs";
import {
  getSheetData,
  appendSheetData,
} from "../../../services/googleSheets.service";

function generateUserId(lastId = "") {
  if (!lastId) return "USR000001";

  const number = parseInt(lastId.replace("USR", ""), 10) + 1;

  return `USR${String(number).padStart(6, "0")}`;
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method Not Allowed",
      });
    }

    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // USERS SHEET
    const rows = await getSheetData("TUsers");

    const users = rows.slice(1);

    const emailExists = users.find(
      (u) => u[2]?.toLowerCase() === email.toLowerCase(),
    );

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const mobileExists = users.find((u) => u[4] === mobile);

    if (mobileExists) {
      return res.status(400).json({
        success: false,
        message: "Mobile already exists",
      });
    }

    const lastUser = users[users.length - 1];
    const userId = generateUserId(lastUser?.[0]);

    const hash = await bcrypt.hash(password, 10);

    const now = new Date().toISOString();

    await appendSheetData("TUsers", [
      userId,
      name,
      email,
      hash,
      mobile,
      "USER",
      "ACTIVE",
      now,
      now,
    ]);

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: {
        userUUID: userId,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
