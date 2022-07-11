import { NextApiRequest, NextApiResponse } from "next/types";
import { getSignedToken } from "../../lib/token";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  // Optional logging to see the responses
  console.log("body: ", username, password);

  if (!username || !password) {
    // Sends a HTTP bad request error code
    return res
      .status(400)
      .json({ message: "Username or password name not found" });
  }

  const accessToken = getSignedToken(username);
  res.status(200).json(accessToken);
}
