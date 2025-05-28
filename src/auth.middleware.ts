import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "./utils";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// tsoa authentication middleware
export async function expressAuthentication(
  request: Request,
  securityName: string,
  _scopes?: string[]
): Promise<JwtPayload> {
  if (securityName !== "jwt") {
    throw new Error(`Unsupported security scheme: ${securityName}`);
  }

  const authHeader = request.headers.authorization;
  if (
    !authHeader?.startsWith("Bearer ") &&
    !_scopes?.find((scope) => scope === "optional")
  ) {
    throw new Error("Unauthorized: Missing or malformed token");
  }

  if (!authHeader) {
    return {
      userId: 0,
      username: "",
    };
  }

  const token = authHeader.split(" ")[1];
  const decoded = await verifyToken(token);

  if (!decoded) {
    throw new Error("Unauthorized: Invalid token");
  }

  request.user = decoded;
  return decoded;
}

// use for standard middleware
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Unauthorized: " + (err as Error).message });
  }
};
