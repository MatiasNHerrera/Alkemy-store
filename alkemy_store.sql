-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-08-2020 a las 01:55:38
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alkemy_store`
--
CREATE DATABASE IF NOT EXISTS `alkemy_store` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `alkemy_store`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `applications`
--

CREATE TABLE `applications` (
  `id_application` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `create_date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `applications`
--

INSERT INTO `applications` (`id_application`, `id_user`, `name`, `category`, `price`, `image`, `create_date`) VALUES
(11, 14, 'Marvel', 'Accion', 30, '1598362790779.jpg', '2020-8-2'),
(12, 14, 'Candy Crush', 'Animado', 34, '1598362858011.jpg', '2020-8-2'),
(14, 14, 'Soul Knight', 'Accion', 85, '1598536122383.jpg', '2020-8-2'),
(24, 26, 'Plants vs Zombies', 'Estrategia', 70, '1598526948426.jpg', '2020-8-4'),
(25, 26, 'Brawl Stars', 'Accion', 80, '1598526974889.jpg', '2020-8-4'),
(26, 26, 'True Skate', 'Deportes', 25, '1598527021613.jpg', '2020-8-4'),
(27, 14, 'Call Of Duty Mobile', 'Accion', 55, '1598535304685.jpg', '2020-8-4'),
(28, 14, 'Clash Of Clans', 'Estrategia', 75, '1598535340504.jpg', '2020-8-4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `user_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `user_type`) VALUES
(14, 'herreranmatias@gmail.com', 'matias321', 'Desarrollador'),
(24, 'matiassh20@gmail.com', 'matias321', 'Cliente'),
(25, 'matih@matih.com', 'matias321', 'Cliente'),
(26, 'desarrollador@desarrollador.com', '123456', 'Desarrollador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id_application`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `applications`
--
ALTER TABLE `applications`
  MODIFY `id_application` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
