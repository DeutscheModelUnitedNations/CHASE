/*
  Warnings:

  - You are about to drop the column `nationId` on the `Delegation` table. All the data in the column will be lost.
  - The primary key for the `Nation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Nation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[conferenceId,nationAlpha3Code]` on the table `Delegation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[alpha2Code]` on the table `Nation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nationAlpha3Code` to the `Delegation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alpha2Code` to the `Nation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Delegation" DROP CONSTRAINT "Delegation_nationId_fkey";

-- DropIndex
DROP INDEX "Delegation_conferenceId_nationId_key";

-- DropIndex
DROP INDEX "Nation_alpha3Code_key";

-- AlterTable
ALTER TABLE "Delegation" DROP COLUMN "nationId",
ADD COLUMN     "nationAlpha3Code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Nation" DROP CONSTRAINT "Nation_pkey",
DROP COLUMN "id",
ADD COLUMN     "alpha2Code" TEXT NOT NULL,
ADD CONSTRAINT "Nation_pkey" PRIMARY KEY ("alpha3Code");

-- CreateIndex
CREATE UNIQUE INDEX "Delegation_conferenceId_nationAlpha3Code_key" ON "Delegation"("conferenceId", "nationAlpha3Code");

-- CreateIndex
CREATE UNIQUE INDEX "Nation_alpha2Code_key" ON "Nation"("alpha2Code");

-- AddForeignKey
ALTER TABLE "Delegation" ADD CONSTRAINT "Delegation_nationAlpha3Code_fkey" FOREIGN KEY ("nationAlpha3Code") REFERENCES "Nation"("alpha3Code") ON DELETE RESTRICT ON UPDATE CASCADE;
