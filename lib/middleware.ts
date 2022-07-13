import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "./token";

export const authMiddleware = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("Auth middlware");
    const token = req.headers.authorization;
    if (!token) {
      console.error("Token not found");
      return res.redirect("/login");
    }

    try {
      const user = verifyToken(token);
      console.log("Decoded " + user);
      await handler(req, res);
    } catch (err) {
      console.error("Error while verifying token");
    }
  };
};
