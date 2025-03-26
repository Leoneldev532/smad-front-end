-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'null';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "withName" BOOLEAN NOT NULL DEFAULT false;
