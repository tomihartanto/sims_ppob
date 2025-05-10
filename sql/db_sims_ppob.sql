/*
 Navicat Premium Dump SQL

 Source Server         : mysql-docker
 Source Server Type    : MySQL
 Source Server Version : 80042 (8.0.42)
 Source Host           : localhost:3306
 Source Schema         : db_sims_ppob

 Target Server Type    : MySQL
 Target Server Version : 80042 (8.0.42)
 File Encoding         : 65001

 Date: 10/05/2025 19:05:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_banners
-- ----------------------------
DROP TABLE IF EXISTS `tb_banners`;
CREATE TABLE `tb_banners`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `banner_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `banner_image` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '0=Inactive,\r\n1=Active;',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_banners
-- ----------------------------
INSERT INTO `tb_banners` VALUES (1, 'Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1);
INSERT INTO `tb_banners` VALUES (2, 'Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1);
INSERT INTO `tb_banners` VALUES (3, 'Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1);
INSERT INTO `tb_banners` VALUES (4, 'Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1);
INSERT INTO `tb_banners` VALUES (5, 'Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1);
INSERT INTO `tb_banners` VALUES (6, 'Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1);

-- ----------------------------
-- Table structure for tb_services
-- ----------------------------
DROP TABLE IF EXISTS `tb_services`;
CREATE TABLE `tb_services`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `service_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `service_icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `service_tariff` int NULL DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_services
-- ----------------------------
INSERT INTO `tb_services` VALUES (1, 'PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000, 1);
INSERT INTO `tb_services` VALUES (2, 'PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000, 1);
INSERT INTO `tb_services` VALUES (3, 'PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000, 1);
INSERT INTO `tb_services` VALUES (4, 'PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000, 1);
INSERT INTO `tb_services` VALUES (5, 'PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, 1);
INSERT INTO `tb_services` VALUES (6, 'MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, 1);
INSERT INTO `tb_services` VALUES (7, 'TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, 1);
INSERT INTO `tb_services` VALUES (8, 'PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000, 1);
INSERT INTO `tb_services` VALUES (9, 'VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000, 1);
INSERT INTO `tb_services` VALUES (10, 'VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000, 1);
INSERT INTO `tb_services` VALUES (11, 'QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000, 1);
INSERT INTO `tb_services` VALUES (12, 'ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000, 1);

-- ----------------------------
-- Table structure for tb_transactions
-- ----------------------------
DROP TABLE IF EXISTS `tb_transactions`;
CREATE TABLE `tb_transactions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `transaction_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `total_amount` int NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_date` datetime NULL DEFAULT NULL,
  `status` tinyint NULL DEFAULT NULL COMMENT '0=Failure,\n\r\n1=Success;',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `tb_users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_transactions
-- ----------------------------
INSERT INTO `tb_transactions` VALUES (1, 'INV20250510-837', 1, 'TOPUP', 1000000, 'Top up balance', '2025-05-10 18:53:20', 1);
INSERT INTO `tb_transactions` VALUES (2, 'INV20250510-873', 1, 'PAYMENT', 40000, 'Pembelian PULSA', '2025-05-10 18:54:49', 1);
INSERT INTO `tb_transactions` VALUES (3, 'INV20250510-717', 1, 'PAYMENT', 50000, 'Pembelian PGN', '2025-05-10 18:55:25', 1);
INSERT INTO `tb_transactions` VALUES (4, 'INV20250510-158', 1, 'PAYMENT', 40000, 'Pembelian Pajak PBB', '2025-05-10 18:57:49', 1);

-- ----------------------------
-- Table structure for tb_users
-- ----------------------------
DROP TABLE IF EXISTS `tb_users`;
CREATE TABLE `tb_users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profile_image` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `balance` int NOT NULL DEFAULT 0,
  `created_date` datetime NULL DEFAULT NULL,
  `status` tinyint NULL DEFAULT 1 COMMENT '0=Inactive,\r\n1=Active;',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `tb_users_unique`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_users
-- ----------------------------
INSERT INTO `tb_users` VALUES (1, 'tomihartanto@example.com', 'Tomi', 'Hartanto', '$2b$10$kERIKVj7oqgjPDrS2VrAcuWcUVhxDIeTiSvI45yKxmw3i6gtpCSs.', NULL, 830000, '2025-05-10 18:50:23', 1);

SET FOREIGN_KEY_CHECKS = 1;
