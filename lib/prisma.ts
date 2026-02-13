import { PrismaClient } from "@prisma/client";

// Ce fichier évite de créer trop de connexions à la base de données
// lors du rechargement à chaud (Hot Reload) en développement.

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;