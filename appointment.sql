-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 25. Apr 2022 um 20:28
-- Server-Version: 10.4.22-MariaDB
-- PHP-Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `appointment`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `creator` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `appName` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`id`, `creator`, `location`, `appName`, `description`, `date`) VALUES
(1, 'Jana Haider', '', 'Getting my nails done', 'It is what it is.', '2022-04-20 00:00:00'),
(2, 'Jana Haider', '', 'Getting my nails done', '', '2002-04-12 00:00:00'),
(3, 'Nico Lerchl', '', 'Formel 1', 'Italien lol', '2022-04-24 00:00:00'),
(4, 'Nico Lerchl', '', 'Formel 1', 'Italien lol', '2022-04-24 00:00:00'),
(5, 'Janko Hu', '', 'Prokrastination', 'Me no like', '2000-08-23 00:00:00'),
(6, 'sda', '', 'fucl', 'neues ding anlegen gell?', '2022-04-24 18:01:00'),
(7, 'Jana Haider', 'Brazil', 'sad', '', '2014-04-25 13:00:00'),
(8, 'sda', 'Vienna', 'Spinning', '', '2022-04-26 06:00:00'),
(9, 'adsggdas', 'agdsgds', 'gdasgaasgd', 'dasdf', '2031-06-19 18:04:00');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
