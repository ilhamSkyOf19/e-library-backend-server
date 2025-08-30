-- CreateTable
CREATE TABLE `Customer` (
    `id_customer` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',

    UNIQUE INDEX `Customer_email_key`(`email`),
    UNIQUE INDEX `Customer_username_key`(`username`),
    PRIMARY KEY (`id_customer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ebook` (
    `id_ebook` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `about` VARCHAR(100) NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `cover` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_ebook`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id_genre` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_genre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EbookGenre` (
    `id_ebook` INTEGER NOT NULL,
    `id_genre` INTEGER NOT NULL,

    PRIMARY KEY (`id_ebook`, `id_genre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id_transaction` INTEGER NOT NULL AUTO_INCREMENT,
    `id_customer` INTEGER NOT NULL,
    `id_ebook` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'CANCELLED') NOT NULL DEFAULT 'PENDING',

    INDEX `idx_transaction_customer`(`id_customer`),
    INDEX `idx_transaction_ebook`(`id_ebook`),
    PRIMARY KEY (`id_transaction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'ADMIN',

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EbookGenre` ADD CONSTRAINT `EbookGenre_id_ebook_fkey` FOREIGN KEY (`id_ebook`) REFERENCES `Ebook`(`id_ebook`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EbookGenre` ADD CONSTRAINT `EbookGenre_id_genre_fkey` FOREIGN KEY (`id_genre`) REFERENCES `Genre`(`id_genre`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_id_customer_fkey` FOREIGN KEY (`id_customer`) REFERENCES `Customer`(`id_customer`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_id_ebook_fkey` FOREIGN KEY (`id_ebook`) REFERENCES `Ebook`(`id_ebook`) ON DELETE RESTRICT ON UPDATE RESTRICT;
