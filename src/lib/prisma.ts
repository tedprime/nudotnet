import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Prisma 7 requires an explicit driver adapter — plain `pg` over the
// Neon *pooled* connection string works from any Node.js runtime (Server
// Actions, Route Handlers) without needing Neon's WebSocket driver.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Reuse a single client across hot reloads in dev so we don't exhaust the
// connection pool.
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
