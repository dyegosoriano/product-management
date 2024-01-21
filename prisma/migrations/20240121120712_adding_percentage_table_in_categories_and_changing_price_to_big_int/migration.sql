/*
  Warnings:

  - Added the required column `percentage` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "percentage" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE BIGINT;
