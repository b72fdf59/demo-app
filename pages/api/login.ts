import { NextApiRequest, NextApiResponse } from "next/types";
import { ulid } from "ulid";

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

  if (username === "usergood") {
    const randomUserId = ulid();
    res.status(200).json({ message: randomUserId });
  } else {
    res.status(200).json({ message: username });
  }
}
