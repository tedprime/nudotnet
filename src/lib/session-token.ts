import { SignJWT, jwtVerify } from 'jose';
import { Role } from '@/generated/prisma/enums';

// Pure jose logic, with no `next/headers` import — safe to use from
// middleware.ts (Edge runtime) as well as from src/lib/session.ts (Node
// runtime: Server Components / Server Actions).

export const SESSION_COOKIE_NAME = 'tedprime_admin_session';
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: Role;
};

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET is not set');
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
