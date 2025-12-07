import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClientSingleton = () => {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  // Soft delete middleware
  client.$use(async (params, next) => {
    const softDeleteModels = [
      "User",
      "AIModule",
      "ChatSession",
      "ChatMessage",
      "HafalanSubmission",
      "HafalanProgress",
      "Donation",
    ];

    // Skip if model doesn't use soft delete
    if (!params.model || !softDeleteModels.includes(params.model)) {
      return next(params);
    }

    // Intercept delete -> update with deletedAt
    if (params.action === "delete") {
      params.action = "update";
      params.args.data = {
        deletedAt: new Date(),
      };
    }

    // Intercept deleteMany -> updateMany
    if (params.action === "deleteMany") {
      params.action = "updateMany";
      if (params.args.data !== undefined) {
        params.args.data.deletedAt = new Date();
      } else {
        params.args.data = { deletedAt: new Date() };
      }
    }

    // Auto filter soft deleted records on queries
    if (["findFirst", "findMany", "findUnique", "count"].includes(params.action)) {
      if (!params.args) {
        params.args = {};
      }
      if (!params.args.where) {
        params.args.where = {};
      }

      // Add deletedAt: null filter (unless explicitly querying deleted)
      if (params.args.where.deletedAt === undefined) {
        params.args.where.deletedAt = null;
      }
    }

    return next(params);
  });

  return client;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
