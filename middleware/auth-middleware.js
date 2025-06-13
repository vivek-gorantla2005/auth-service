import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  //Bearer <token>
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Please log in to proceed."
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);

    req.userInfo = decodedToken; 
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token. Please log in again."
    });
  }
};

export default authMiddleware;
