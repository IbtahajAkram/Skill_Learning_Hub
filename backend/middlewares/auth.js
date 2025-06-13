import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;
//     if (!token) {
//       return res.status(401).json({ message: "No token provided." });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await prisma.user.findUnique({
//       where: { id: decoded.id },
//     });

//     if (!req.user) {
//       return res.status(401).json({ message: "User not found." });
//     }

//     next();
//   } catch (error) {
//     console.error("Auth error:", error);
//     res.status(401).json({ message: "Not authorized, token failed." });
//   }
// };

// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         message:
//           "Unauthorized access, You don't have permission to access this resource.",
//       });
//     }
//     next();
//   };
// };

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided || Login First!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "un Authorized User! || Login First!" });
  }
};
export const authorize = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({
        message: "Unauthorized access, You don't have permission to access this resource.",
      });
    }
    next();
  };
};

