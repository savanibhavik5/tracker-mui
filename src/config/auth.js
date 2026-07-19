export const authConfig = {
  accessToken: {
    expiresIn: "15m",
  },

  refreshToken: {
    expiresIn: "7d",
  },

  cookie: {
    access: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    },

    refresh: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
};