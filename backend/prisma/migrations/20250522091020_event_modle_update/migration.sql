/*
  Warnings:

  - Added the required column `category` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('Professional', 'Educational', 'Social', 'Business', 'Health', 'Sports', 'Tech', 'Sales', 'Community', 'Personal');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "category" "EventCategory" NOT NULL;
