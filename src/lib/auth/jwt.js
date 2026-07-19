import jwt from "jsonwebtoken";
import { authConfig } from "@/config/auth";

console.log("ACCESS:", process.env.JWT_ACCESS_SECRET);
console.log("REFRESH:", process.env.JWT_REFRESH_SECRET);

export function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: authConfig.accessToken.expiresIn,
  });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: authConfig.refreshToken.expiresIn,
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}
