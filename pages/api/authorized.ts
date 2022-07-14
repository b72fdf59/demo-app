import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../../lib/middleware";

const authorized = (_req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ message: "AUTH_SUCCESS" });
};

export default authMiddleware(authorized);
