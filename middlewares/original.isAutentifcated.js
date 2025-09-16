import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Middleware to authenticate requests

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated.", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token.", success: false });
    }

    const user = await User.findById(decoded.userId); 
    if (!user) {
      return res.status(401).json({ message: "User not found.", success: false });
    }

    req.user = { userId: user._id, email: user.email, role: user.role }; 
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Server error.", success: false });
  }
};

export default isAuthenticated;
