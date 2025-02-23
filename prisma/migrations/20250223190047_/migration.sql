/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Password` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PendingCredentialCreateTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `family_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `given_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locale` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferred_username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_userId_fkey";

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_validationTokenId_fkey";

-- DropForeignKey
ALTER TABLE "Password" DROP CONSTRAINT "Password_userId_fkey";

-- DropForeignKey
ALTER TABLE "PendingCredentialCreateTask" DROP CONSTRAINT "PendingCredentialCreateTask_tokenId_fkey";

-- DropForeignKey
ALTER TABLE "PendingCredentialCreateTask" DROP CONSTRAINT "PendingCredentialCreateTask_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "family_name" TEXT NOT NULL,
ADD COLUMN     "given_name" TEXT NOT NULL,
ADD COLUMN     "locale" TEXT NOT NULL,
ADD COLUMN     "preferred_username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Email";

-- DropTable
DROP TABLE "Password";

-- DropTable
DROP TABLE "PendingCredentialCreateTask";

-- DropTable
DROP TABLE "Token";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
