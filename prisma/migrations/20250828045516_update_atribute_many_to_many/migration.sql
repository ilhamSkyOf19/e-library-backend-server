/*
  Warnings:

  - You are about to drop the column `id_ebook` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `id_genre` on the `ebook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `customer_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ebook` DROP FOREIGN KEY `ebook_ibfk_1`;

-- DropIndex
DROP INDEX `id_ebook` ON `customer`;

-- DropIndex
DROP INDEX `id_genre` ON `ebook`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `id_ebook`;

-- AlterTable
ALTER TABLE `ebook` DROP COLUMN `id_genre`;

-- CreateTable
CREATE TABLE `_CustomerEbooks` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CustomerEbooks_AB_unique`(`A`, `B`),
    INDEX `_CustomerEbooks_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GenreEbook` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GenreEbook_AB_unique`(`A`, `B`),
    INDEX `_GenreEbook_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `customer_email_key` ON `customer`(`email`);

-- AddForeignKey
ALTER TABLE `_CustomerEbooks` ADD CONSTRAINT `_CustomerEbooks_A_fkey` FOREIGN KEY (`A`) REFERENCES `customer`(`id_customer`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CustomerEbooks` ADD CONSTRAINT `_CustomerEbooks_B_fkey` FOREIGN KEY (`B`) REFERENCES `ebook`(`id_ebook`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenreEbook` ADD CONSTRAINT `_GenreEbook_A_fkey` FOREIGN KEY (`A`) REFERENCES `ebook`(`id_ebook`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenreEbook` ADD CONSTRAINT `_GenreEbook_B_fkey` FOREIGN KEY (`B`) REFERENCES `genre`(`id_genre`) ON DELETE CASCADE ON UPDATE CASCADE;
