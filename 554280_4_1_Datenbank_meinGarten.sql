-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 18, 2023 at 09:52 PM
-- Server version: 10.3.31-MariaDB-0+deb10u1
-- PHP Version: 7.0.33-57+0~20211119.61+debian10~1.gbp5d8ba5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `554280_4_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `ausstattung`
--

CREATE TABLE `ausstattung` (
  `ID` int(11) NOT NULL,
  `ausstattung` varchar(42) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ausstattung`
--

INSERT INTO `ausstattung` (`ID`, `ausstattung`) VALUES
(1, 'Werkzeug'),
(2, 'Stromanschluss'),
(3, 'Wifi'),
(4, 'Wasseranschluss'),
(5, 'Gartenhaus'),
(6, 'Sitzgelegenheit'),
(7, 'Gewächshaus');

-- --------------------------------------------------------

--
-- Table structure for table `garten`
--

CREATE TABLE `garten` (
  `ID` int(11) NOT NULL,
  `titel` varchar(100) NOT NULL,
  `bild` varchar(200) NOT NULL,
  `adresse` varchar(200) NOT NULL,
  `mietdauer` int(11) NOT NULL,
  `beschreibung` varchar(200) NOT NULL,
  `user` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `preis` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `garten`
--

INSERT INTO `garten` (`ID`, `titel`, `bild`, `adresse`, `mietdauer`, `beschreibung`, `user`, `status`, `preis`, `timestamp`) VALUES
(3, 'Schöner Garten in der Altstadt von Zofingen', 'https://www.bern.ch/themen/freizeit-und-sport/gartnern-in-der-stadt/ftw-simplelayout-textblock-8/@@images/d441c693-8629-48ac-be37-dd5c956e5c4c.jpeg', 'Hintere Hauptgasse 12, 4800 Zofingen, AG, CH', 3, ' Dieser schöne Garten bietet in der feinen Altstadt von Zofingen die erwünschte Privatsphäre und ist ein wahrer Augenschmaus. Ob nur um sich zu erholen, oder ein Beet anzulegen für Gemüse oder Blumen.', 15, 1, 0, '2023-01-11 10:24:02'),
(77, 'Garten der Villa Medici', 'https://www.stuttgarter-zeitung.de/media.media.41d4cd85-c58f-41e1-9e09-16267874e8c9.original1024.jpg', 'Piazza Giacomo Puccini, 50144 Firenze FI, Italien', 4, 'Ciao a tutti! Ich biete einen schönen italienischen Garten an, der in der Blütezeit von Florenz entstanden ist. Er macht zwar viel Arbeit, entschädigt jedoch mit seiner Schönheit.  ', 61, 1, 1000, '2023-01-17 10:34:08'),
(78, 'Hängende Gärten von Babylon', 'https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/sspb_haengendegaerten_haengendegaertenvonbabylon_muenchenerbilderbogennr927_1886_credit_akgimages.jpg?itok=pV56KyGq', 'Sperchiada, Makrakomi 350 03, Griechenland', 2, 'Dieser Garten glänzt mit seinen wunderbaren Epiphyten und hat für jeden was zu bieten. Im Preis inbegriffen ist das Schwimmbecken.', 62, 1, 2500, '2023-01-17 10:40:54'),
(79, 'Old lady with an English Garden', 'https://www.gartentipps.com/wp-content/uploads/2020/12/garten-gestalten-aspekte.jpg', 'Little Tew, Chipping Norton OX7 4JQ, Vereinigtes Königreich', 4, 'At my old age it becomes impossible to care for my garden. I would be delighted if I could find someone to look after it.', 63, 1, 0, '2023-01-17 10:50:45'),
(80, 'Garten im Mattequartier Bern', 'https://www.matte.ch/images/stories/offgarten_02.jpg', 'Mattenhof 3, 3011 Bern', 4, ' Wunderschöner Garten im Mattequartier Bern. Leider bin ich zu alt, um meinen Garten selbst zu pflegen.', 14, 1, 175, '2023-01-17 11:18:11');

-- --------------------------------------------------------

--
-- Table structure for table `garten_hat_ausstattung`
--

CREATE TABLE `garten_hat_ausstattung` (
  `ID` int(11) NOT NULL,
  `garten_id` int(11) NOT NULL,
  `ausstattung_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `garten_hat_ausstattung`
--

INSERT INTO `garten_hat_ausstattung` (`ID`, `garten_id`, `ausstattung_id`) VALUES
(48, 3, 2),
(49, 3, 5),
(50, 3, 6),
(51, 3, 4),
(285, 77, 4),
(286, 77, 5),
(287, 78, 1),
(288, 78, 4),
(289, 78, 6),
(294, 79, 2),
(295, 79, 5),
(296, 79, 6),
(297, 79, 7),
(363, 80, 1),
(364, 80, 4),
(365, 80, 6),
(366, 80, 2),
(391, 102, 4),
(392, 102, 2);

-- --------------------------------------------------------

--
-- Table structure for table `mietdauer`
--

CREATE TABLE `mietdauer` (
  `ID` int(11) NOT NULL,
  `mietdauer` varchar(42) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mietdauer`
--

INSERT INTO `mietdauer` (`ID`, `mietdauer`) VALUES
(1, '3 Monate'),
(2, '6 Monate'),
(3, '9 Monate'),
(4, '1 Jahr');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Token` varchar(42) NOT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`ID`, `User_ID`, `Token`, `Timestamp`) VALUES
(306, 98, 'IVQGxjAj0rUatnRJvlqu9b8tcfYOVyoNaGhirK3nMe', '2023-01-18 20:49:09');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `name`, `email`, `password`) VALUES
(14, 'sand', 'sand@sand.ch', '$2y$10$AJoTEmKPIYrgindyJt.9P.0VtPp7lpfsTwJqZFMyEMTEgJ344Yv4O'),
(15, 'lenny', 'lenny@lenny.ch', '$2y$10$et/ZOBjX7z4FA8Axg0lt8uhYiLrz6icXVXAoea4LTTERTCKPg5wji'),
(61, 'Cosimo de\' Medici', 'villa@medici.ch', '$2y$10$jJP0uD0ndatXT.806AYEcOeMUoxXCYH0Y9/dTAuFBK03vmTouHnVS'),
(62, 'Babylonus16', 'garten@babylon.ch', '$2y$10$OSoq0hTR6vj.o4peEM7FIeCdZq4gdJQCIgOKZi5LmQXL.Lx/v5tiy'),
(63, 'MacSmith_42', 'mac@smith.uk', '$2y$10$hL.OVOz9rBtg8NZTGVmIFuNw/HvH.Kg2y107Wb0qoyLjq/Z82IbDu'),
(97, 'velo', 'velo@hallo.ch', '$2y$10$GYqVVmNzHufH2C9/LiMeHeMc8isi1bCEhD41YEiu/2Tw6/C0m0Cc6'),
(98, '123', '123@123.ch', '$2y$10$990rVt7ZTJUwm99XhibnnuS9YDgAgbwo5cNYlaotPYid70Skf/yBm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ausstattung`
--
ALTER TABLE `ausstattung`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `garten`
--
ALTER TABLE `garten`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `mietdauer_id` (`mietdauer`),
  ADD KEY `user_id` (`user`);

--
-- Indexes for table `garten_hat_ausstattung`
--
ALTER TABLE `garten_hat_ausstattung`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_garten_id` (`garten_id`),
  ADD KEY `fk_ausstattung_id` (`ausstattung_id`);

--
-- Indexes for table `mietdauer`
--
ALTER TABLE `mietdauer`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `session_userid` (`User_ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `garten`
--
ALTER TABLE `garten`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;
--
-- AUTO_INCREMENT for table `garten_hat_ausstattung`
--
ALTER TABLE `garten_hat_ausstattung`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=393;
--
-- AUTO_INCREMENT for table `mietdauer`
--
ALTER TABLE `mietdauer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=307;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `garten`
--
ALTER TABLE `garten`
  ADD CONSTRAINT `mietdauer_id` FOREIGN KEY (`mietdauer`) REFERENCES `mietdauer` (`ID`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user`) REFERENCES `user` (`ID`);

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_userid` FOREIGN KEY (`User_ID`) REFERENCES `user` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
