/*
  Warnings:

  - A unique constraint covering the columns `[resendApiKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resendApiKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_resendApiKey_key" ON "User"("resendApiKey");
