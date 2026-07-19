// import { generateAccessToken, verifyRefreshToken } from "@/lib/auth/jwt";
// import { getSheetData } from "@/services/googleSheets.service";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({
//       success: false,
//       message: "Method Not Allowed",
//     });
//   }

//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       return res.status(401).json({
//         success: false,
//         message: "Refresh token missing",
//       });
//     }

//     // Verify Refresh Token
//     const decoded = verifyRefreshToken(refreshToken);

//     // Get latest user from DB
//     const rows = (await getSheetData("TUsers")).slice(2);

//     const user = rows.find(
//       (row) => row[0] === decoded.userUUID
//     );

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (user[6] !== "ACTIVE") {
//       return res.status(401).json({
//         success: false,
//         message: "Account Disabled",
//       });
//     }

//     const payload = {
//       userUUID: user[0],
//       name: user[1],
//       email: user[2],
//       mobile: user[4],
//       role: user[5],
//     };

//     const accessToken = generateAccessToken(payload);

//     return res.status(200).json({
//       success: true,
//       accessToken,
//       user: payload,
//     });

//   } catch (err) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid Refresh Token",
//     });
//   }
// }




import { parse } from "cookie";
import {
  verifyRefreshToken,
  generateAccessToken,
} from "@/lib/auth/jwt";

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