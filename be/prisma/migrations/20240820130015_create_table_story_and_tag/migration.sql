-- CreateTable
CREATE TABLE `Story` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(255) NOT NULL,
    `penulis` VARCHAR(255) NOT NULL,
    `sinopsis` VARCHAR(191) NOT NULL,
    `sampul` VARCHAR(191) NOT NULL,
    `kategori` ENUM('FINANSIAL', 'TEKNOLOGI', 'KESEHATAN') NOT NULL,
    `status` ENUM('TERBIT', 'DRAF') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `storyId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `Story`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
