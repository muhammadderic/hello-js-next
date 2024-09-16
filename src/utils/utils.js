import { jwtVerify, SignJWT } from 'jose';

export async function createJwt(createdTokenData) {
  const secret = new TextEncoder().encode('your_secret');
  const token = await new SignJWT(createdTokenData)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  return token;
}

// Example: Verifying a JWT
export async function verifyToken(token) {
  const secret = new TextEncoder().encode('your_secret');

  const { payload } = await jwtVerify(token, secret);
  return payload;
}