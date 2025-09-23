/*
  Warnings:

  - You are about to drop the column `location` on the `AirQualityData` table. All the data in the column will be lost.
  - You are about to alter the column `severity` on the `AlertMeta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `status` on the `AlertMeta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to drop the column `zone` on the `EnergyUsageData` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `TrafficData` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `WasteCollectionData` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `AirQualityData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `EnergyUsageData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `TrafficData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `WasteCollectionData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `AlertMeta` DROP FOREIGN KEY `AlertMeta_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `AuditLog` DROP FOREIGN KEY `AuditLog_actorId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Report` DROP FOREIGN KEY `Report_generatedBy_fkey`;

-- DropIndex
DROP INDEX `AirQualityData_location_timestamp_idx` ON `AirQualityData`;

-- DropIndex
DROP INDEX `AlertMeta_createdBy_fkey` ON `AlertMeta`;

-- DropIndex
DROP INDEX `AuditLog_actorId_fkey` ON `AuditLog`;

-- DropIndex
DROP INDEX `EnergyUsageData_zone_timestamp_idx` ON `EnergyUsageData`;

-- DropIndex
DROP INDEX `Notification_userId_fkey` ON `Notification`;

-- DropIndex
DROP INDEX `Report_generatedBy_fkey` ON `Report`;

-- DropIndex
DROP INDEX `TrafficData_location_timestamp_idx` ON `TrafficData`;

-- DropIndex
DROP INDEX `WasteCollectionData_location_idx` ON `WasteCollectionData`;

-- AlterTable
ALTER TABLE `AirQualityData` DROP COLUMN `location`,
    ADD COLUMN `locationId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `AlertMeta` MODIFY `severity` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    MODIFY `status` ENUM('PENDING', 'ACKNOWLEDGED', 'RESOLVED') NOT NULL;

-- AlterTable
ALTER TABLE `EnergyUsageData` DROP COLUMN `zone`,
    ADD COLUMN `locationId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TrafficData` DROP COLUMN `location`,
    ADD COLUMN `locationId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `WasteCollectionData` DROP COLUMN `location`,
    ADD COLUMN `locationId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `AirQualityData_locationId_timestamp_idx` ON `AirQualityData`(`locationId`, `timestamp`);

-- CreateIndex
CREATE INDEX `EnergyUsageData_locationId_timestamp_idx` ON `EnergyUsageData`(`locationId`, `timestamp`);

-- CreateIndex
CREATE INDEX `TrafficData_locationId_timestamp_idx` ON `TrafficData`(`locationId`, `timestamp`);

-- CreateIndex
CREATE INDEX `User_role_idx` ON `User`(`role`);

-- CreateIndex
CREATE INDEX `WasteCollectionData_locationId_idx` ON `WasteCollectionData`(`locationId`);

-- AddForeignKey
ALTER TABLE `TrafficData` ADD CONSTRAINT `TrafficData_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AirQualityData` ADD CONSTRAINT `AirQualityData_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnergyUsageData` ADD CONSTRAINT `EnergyUsageData_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WasteCollectionData` ADD CONSTRAINT `WasteCollectionData_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlertMeta` ADD CONSTRAINT `AlertMeta_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_generatedBy_fkey` FOREIGN KEY (`generatedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
