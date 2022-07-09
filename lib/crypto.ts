import {
  CipherGCMTypes,
  createDecipheriv,
  createCipheriv,
  randomBytes,
} from "crypto";

export const BASE64_ENCODING = "base64";
export const UTF8 = "utf8";
export const symmetricAlgorithm: CipherGCMTypes = "aes-256-gcm";
// TODO: We should use different DEK for each encryption. The encrypted DEK should be stored along with the actual data. We should encrypt the DEK using KEK which should generally be manage by third party.
// For this demo we do not store to persistent storage so we are currently only using different random generated key every time this service boots up and use that key to encrypt / decrypt all data.
const symmetricKey = Buffer.alloc(32, randomBytes(32)).toString("base64");

export interface CiphertextSymmetric {
  cipherText: string;
  initializationVector: string;
  messageAuthenticationCode: string;
}

export function encrypt(plaintext: string): CiphertextSymmetric {
  const k = Buffer.from(symmetricKey, BASE64_ENCODING);
  const iv = Buffer.alloc(16, randomBytes(16));
  const cipher = createCipheriv(symmetricAlgorithm, k, iv);
  let encrypted = cipher.update(plaintext, UTF8, BASE64_ENCODING);
  encrypted += cipher.final(BASE64_ENCODING);
  const mac = cipher.getAuthTag();
  return {
    cipherText: encrypted,
    initializationVector: iv.toString(BASE64_ENCODING),
    messageAuthenticationCode: mac.toString(BASE64_ENCODING),
  };
}

export function decrypt(cipher: CiphertextSymmetric): string {
  const { cipherText, initializationVector, messageAuthenticationCode } =
    cipher;
  const k = Buffer.from(symmetricKey, BASE64_ENCODING);
  const iv = Buffer.from(initializationVector, BASE64_ENCODING);
  const mac = Buffer.from(messageAuthenticationCode, BASE64_ENCODING);
  const decipher = createDecipheriv(symmetricAlgorithm, k, iv);
  decipher.setAuthTag(mac);
  let plaintext = decipher.update(cipherText, BASE64_ENCODING, UTF8);
  try {
    plaintext += decipher.final(UTF8);
  } catch (err) {
    throw "Authentication failed!";
  }
  return plaintext;
}
