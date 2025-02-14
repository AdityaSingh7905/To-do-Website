const jwt = require("jsonwebtoken");

function AuthMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Extract the token properly
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;
  console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    if (!decoded.userId) {
      return res.status(401).json({ error: "Invalid token: userId missing" });
    }

    req.user = decoded; // Attach entire decoded payload to req.user
    console.log("Authenticated User ID:", req.user.userId);

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = AuthMiddleware;
