import { serialize } from "cookie";

export const setAccessTokenCookie = (res, token) => {
  return serialize("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15,
  });
};

export const setRefreshTokenCookie = (res, token) => {
  return serialize("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
};

export const createAccessTokenCookie = (token) => {
  return serialize("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15, // 15 Minutes
  });
};

export const createRefreshTokenCookie = (token) => {
  return serialize("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 Days
  });
};
