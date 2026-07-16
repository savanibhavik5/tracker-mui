export default async function apiHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  return res.status(501).json({
    success: false,
    message: "Refresh token is not implemented yet.",
  });
}
