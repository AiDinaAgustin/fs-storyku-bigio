-- CreateTable
CREATE TABLE `Chapter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `story` VARCHAR(191) NOT NULL,
    `storyId` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Menambahkan kolom createdAt dengan nilai default
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Menambahkan kolom updatedAt dengan nilai default

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `Story`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `Story` ADD COLUMN `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP; -- Menambahkan kolom createdAt dengan nilai default
ALTER TABLE `Story` ADD COLUMN `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP; -- Menambahkan kolom updatedAt dengan nilai default
