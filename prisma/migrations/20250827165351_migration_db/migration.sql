-- CreateTable
CREATE TABLE `customer` (
    `id_customer` INTEGER NOT NULL,
    `id_ebook` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    INDEX `Key`(`name`, `email`, `username`, `password`),
    INDEX `id_ebook`(`id_ebook`),
    PRIMARY KEY (`id_customer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ebook` (
    `id_ebook` INTEGER NOT NULL,
    `id_genre` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `about` VARCHAR(100) NOT NULL,
    `author` VARCHAR(100) NOT NULL,

    INDEX `Key`(`name`, `price`, `stock`, `about`, `author`),
    INDEX `id_genre`(`id_genre`),
    PRIMARY KEY (`id_ebook`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genre` (
    `id_genre` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    INDEX `Key`(`name`),
    PRIMARY KEY (`id_genre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id_transaction` INTEGER NOT NULL,
    `id_customer` INTEGER NOT NULL,
    `id_ebook` INTEGER NOT NULL,

    INDEX `id_customer`(`id_customer`),
    INDEX `id_ebook`(`id_ebook`),
    PRIMARY KEY (`id_transaction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`id_ebook`) REFERENCES `ebook`(`id_ebook`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ebook` ADD CONSTRAINT `ebook_ibfk_1` FOREIGN KEY (`id_genre`) REFERENCES `genre`(`id_genre`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer`(`id_customer`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`id_ebook`) REFERENCES `ebook`(`id_ebook`) ON DELETE RESTRICT ON UPDATE RESTRICT;
