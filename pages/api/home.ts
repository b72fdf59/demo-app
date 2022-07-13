import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../../lib/middleware";

type Data = {
  name: string;
};

function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: "Protected" });
}

export default authMiddleware(handler);
