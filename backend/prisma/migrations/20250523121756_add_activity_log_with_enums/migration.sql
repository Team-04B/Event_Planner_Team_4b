-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('USER', 'EVENT', 'PAYMENT');

-- CreateEnum
CREATE TYPE "ActivityAction" AS ENUM ('CREATED', 'UPDATED', 'DELETED');

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "action" "ActivityAction" NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT,
    "relatedEntityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);
