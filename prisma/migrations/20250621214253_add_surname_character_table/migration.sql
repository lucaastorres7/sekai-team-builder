/*
  Warnings:

  - Added the required column `surname` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "surname" TEXT NOT NULL;
