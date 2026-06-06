-- CreateTable
CREATE TABLE "InterviewRequest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "website" TEXT,
    "primaryContact" TEXT NOT NULL,
    "secondaryContact" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewRequest_pkey" PRIMARY KEY ("id")
);
