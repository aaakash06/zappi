import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenHeader: string | undefined = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(403).json({ message: "no auth token found" });
  }
  const token: string | undefined = tokenHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "invalid auth token found" });
  }
  try {
    const payload = verify(
      token,
      process.env.JWT_SECRET || "somepasswordsecret"
    );
    if (!payload) {
      return res.status(403).json({ message: "invalid auth token found" });
    }
    //@ts-ignore
    req.id = payload.id;
    next();
  } catch (e) {
    console.log("error while authorizing the token");
    return res
      .status(403)
      .json({ message: "some error while authorization. Try again" });
  }
}
