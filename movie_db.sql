-- -------------------------------------------------------------
-- TablePlus 4.8.7(448)
--
-- https://tableplus.com/
--
-- Database: movie_db
-- Generation Time: 2022-09-13 21:19:21.1250
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `banner` varchar(255) DEFAULT NULL,
  `movie_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cineflex` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cinema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `cineplexId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cineplexId` (`cineplexId`),
  CONSTRAINT `cinema_ibfk_1` FOREIGN KEY (`cineplexId`) REFERENCES `cineflex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cinema_movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cinemaId` int DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movieId` (`movieId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `startDate` datetime DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `evaluate` int DEFAULT NULL,
  `poster` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role` (
  `id` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `seat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `TYPE` varchar(255) DEFAULT NULL,
  `showTimeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `showTimeId` (`showTimeId`),
  CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`showTimeId`) REFERENCES `showtime` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `showtime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `startTime` datetime DEFAULT NULL,
  `cinemaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cinemaId` (`cinemaId`),
  CONSTRAINT `showtime_ibfk_1` FOREIGN KEY (`cinemaId`) REFERENCES `cinema` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `movieId` (`movieId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `banner` (`id`, `banner`, `movie_id`) VALUES
(1, 'https://ephoto360.com/uploads/worigin/2019/07/06/banner_1-min5d2016cb2f52f_bf8e0aa1ab695fd74e3deb674eb1a2e0.jpg', 1);

INSERT INTO `cineflex` (`id`, `name`, `logo`) VALUES
(1, 'CGV', 'https://play-lh.googleusercontent.com/9N7f8PWb1zlDqOR4mepkNFkRt5SlrjFoLsg5jYtVhvq9LeQneLKyHg9eEx4BSgyl7F4');

INSERT INTO `cinema` (`id`, `name`, `address`, `image`, `cineplexId`) VALUES
(1, 'Lê Lợi', '72, Lê Lợi', 'https://www.cgv.vn/media/site/cache/1/980x415/b58515f018eb873dafa430b6f9ae0c1e/h/n/hnc-2.png', 1);

INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`, `trailer`) VALUES
(2, 'Batman', '2022-06-09 00:00:00', '2022-04-09 00:00:00', 5, 'https://thegioidienanh.vn/stores/news_dataimages/anhvu/112021/08/12/2034_03.jpg?rt=20211108122124', 'https://www.youtube.com/watch?v=5iUVoG6UE9Q'),
(3, 'Thor and Thunder', '2022-04-09 16:11:30', '2022-04-09 16:11:30', NULL, '', ''),
(4, 'Thor 2', '2022-04-09 16:11:30', '2022-04-09 16:11:30', NULL, '', ''),
(5, 'Ironman 3', '2022-04-09 16:11:30', '2022-04-09 16:11:30', NULL, '', ''),
(6, 'Ironman 2', '2022-04-09 16:11:30', '2022-04-09 16:11:30', 5, '', '');

INSERT INTO `role` (`id`, `role`) VALUES
('KhachHang', 'Khách hàng'),
('QuanTri', 'Quản trị');

INSERT INTO `showtime` (`id`, `startTime`, `cinemaId`) VALUES
(1, '2022-04-09 13:56:20', 1),
(2, '2022-04-09 05:56:20', 1),
(3, '2022-04-09 01:56:20', 1),
(4, '2022-09-04 01:56:20', 1);

INSERT INTO `user` (`id`, `name`, `email`, `phone`, `password`, `roleId`) VALUES
(1, 'Thien', 'nguyenquangthien195@gmail.com', '0902998513', '$2a$10$a1glXuLJ8qVF8HxmK73RI.Tc7BKA.bP8brvppwb51mpgB76wgESnG', 'QuanTri'),
(2, 'Me', 'nguyenquangthien1951@gmail.com', '0932620583', '$2a$10$i2b9cH.MhExClCfw1cu41u4iIojCWyPYSREjZTrWv4oDPKdweMeG2', 'QuanTri');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;