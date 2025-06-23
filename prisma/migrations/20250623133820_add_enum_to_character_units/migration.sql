/*
  Warnings:

  - Changed the type of `unit` on the `Character` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Units" AS ENUM ('NIGHTCORD', 'LEO_NEED', 'VIVID_SQUAD', 'SHOWTIME', 'MORE_JUMP');

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "unit",
ADD COLUMN     "unit" "Units" NOT NULL;
