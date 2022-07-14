import jwt, { JwtPayload } from "jsonwebtoken";
import { ulid } from "ulid";

export type AccessToken = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};
const secret = ulid();
console.log(secret);

export const getSignedToken = (username: string): AccessToken => {
  return {
    accessToken: jwt.sign(
      {
        sub: username,
      },
      secret,
      { expiresIn: 60 * 60 }
    ),
    tokenType: "Bearer",
    expiresIn: 60 * 60,
  };
};

export const verifyToken = (token: string): string | JwtPayload => {
  try {
    var decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    console.log(err);
    throw new Error("INVALID TOKEN EROR");
  }
};
