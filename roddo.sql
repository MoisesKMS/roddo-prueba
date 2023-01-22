-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.6.8-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla roddo.real_state_list
CREATE TABLE IF NOT EXISTS `real_state_list` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `Field` int(11) DEFAULT NULL,
  `Construction` int(11) DEFAULT NULL,
  `Address` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ContactPhone` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ContactMail` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Bathrooms` int(11) NOT NULL,
  `Bedrooms` int(11) NOT NULL,
  `ParkingLots` int(11) NOT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `DeletedDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla roddo.real_state_list: ~4 rows (aproximadamente)
DELETE FROM `real_state_list`;
INSERT INTO `real_state_list` (`ID`, `Description`, `Field`, `Construction`, `Address`, `ContactPhone`, `ContactMail`, `Bathrooms`, `Bedrooms`, `ParkingLots`, `CreatedDate`, `DeletedDate`) VALUES
	(1, 'Casa cerca de la Playa', 2, 2, 'Lazaro Mich.', '4435679088', 'correo@correo.com', 2, 4, 2, '2023-01-22 05:24:05', NULL),
	(2, 'Casa en Renta zona centro', 2, 2, 'Morelia', '4436789044', 'correo2@correo.com', 1, 2, 1, '2023-01-22 05:26:50', NULL),
	(3, 'Departamento en renta', 2, 2, 'Zamora', '3514456689', 'otrocorreo@correo.com', 2, 4, 2, '2023-01-22 05:25:15', NULL),
	(4, 'Departamento cerca de zona hotelera', 2, 2, 'CDMX', '4435572241', 'uncorreomas@correo.com', 1, 2, 1, '2023-01-22 05:26:02', NULL);

-- Volcando estructura para tabla roddo.users
CREATE TABLE IF NOT EXISTS `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Password` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `DeletedDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla roddo.users: ~1 rows (aproximadamente)
DELETE FROM `users`;
INSERT INTO `users` (`Id`, `Password`, `Username`, `CreatedDate`, `DeletedDate`) VALUES
	(1, '$2a$04$cUpAx4z6/mGhhxcxY/XPNuCrCAyq4Hh1sCNUWbbRqvqrDjmMTjsEq', 'Roddo', '2023-01-21 18:27:08', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
