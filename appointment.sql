-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 27. Apr 2022 um 22:18
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
  `duration` int(11) NOT NULL,
  `latestDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`id`, `creator`, `location`, `appName`, `description`, `duration`, `latestDate`) VALUES
(71, 'Jana Haider', 'Neubau', 'Ebi Restaurant', 'All you can eat buffet', 120, '2022-04-28 11:00:00'),
(73, 'Nico Lerchl', 'My crib', 'Neues Album', 'Ich mache einen neuen Album, yo', 30, '2022-06-20 19:30:00'),
(74, 'Maksymilian Ormianin', 'Praterstern', 'Abgelaufen', 'I\'m sorry, you can\'t comment anymore...', 15, '2022-04-24 06:00:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `availdates`
--

CREATE TABLE `availdates` (
  `id` int(11) NOT NULL,
  `app_id` int(11) NOT NULL,
  `appDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `availdates`
--

INSERT INTO `availdates` (`id`, `app_id`, `appDate`) VALUES
(11, 71, '2022-04-27 12:00:00'),
(12, 71, '2022-04-28 11:00:00'),
(14, 74, '2022-04-24 06:00:00'),
(15, 74, '2022-04-06 22:16:16'),
(16, 73, '2022-06-20 19:30:00'),
(17, 73, '2022-07-12 22:16:16'),
(18, 73, '2022-05-12 22:16:16');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `creator` varchar(50) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `text` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `comments`
--

INSERT INTO `comments` (`id`, `creator`, `appointment_id`, `text`) VALUES
(11, 'Maksymilian Ormianin', 71, 'Can I also come?'),
(12, 'Jana Haider', 74, 'Ha, ich hab\'s noch geschafft es zu kommentieren!');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `appName` (`appName`);

--
-- Indizes für die Tabelle `availdates`
--
ALTER TABLE `availdates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `app_id` (`app_id`);

--
-- Indizes für die Tabelle `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT für Tabelle `availdates`
--
ALTER TABLE `availdates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT für Tabelle `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `availdates`
--
ALTER TABLE `availdates`
  ADD CONSTRAINT `availdates_ibfk_1` FOREIGN KEY (`app_id`) REFERENCES `appointments` (`id`);

--
-- Constraints der Tabelle `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
