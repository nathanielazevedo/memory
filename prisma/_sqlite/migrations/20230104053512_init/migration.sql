
-- CreateTable
CREATE TABLE "Words" (
    "id" TEXT NOT NULL,
    "known" TEXT NOT NULL,
    "learning" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Words_pkey" PRIMARY KEY ("id")
);
