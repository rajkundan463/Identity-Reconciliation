/*
  Warnings:

  - You are about to alter the column `email` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phoneNumber` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(20);
