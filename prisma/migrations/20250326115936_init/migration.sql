/*
  Warnings:

  - You are about to drop the column `code` on the `FormDeveloper` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FormDeveloper" DROP COLUMN "code",
ADD COLUMN     "githubRepo" TEXT NOT NULL DEFAULT 'null';
