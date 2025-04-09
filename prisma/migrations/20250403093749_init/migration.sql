-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'null',
ADD COLUMN     "referrer" TEXT NOT NULL DEFAULT 'null';
