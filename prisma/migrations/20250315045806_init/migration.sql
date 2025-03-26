-- CreateTable
CREATE TABLE "FormDeveloper" (
    "id" TEXT NOT NULL,
    "developerName" TEXT NOT NULL,
    "portfolioLink" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "pageLink" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormDeveloper_pkey" PRIMARY KEY ("id")
);
