-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2021 at 01:23 AM
-- Server version: 5.7.17
-- PHP Version: 7.1.3
use chat_system;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `corby`
--

CREATE TABLE `corby` (
  `userID` int(11) NOT NULL,
  `msgID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `corby`
--

INSERT INTO `corby` (`userID`, `msgID`) VALUES
(1, 1),
(1, 24),
(2, 1),
(2, 3),
(2, 32),
(2, 33);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `reciver_id` int(11) NOT NULL,
  `object` varchar(100) CHARACTER SET utf8 NOT NULL,
  `message_content` text CHARACTER SET utf8 NOT NULL,
  `file` varchar(100) CHARACTER SET utf8 NOT NULL,
  `showed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `reciver_id`, `object`, `message_content`, `file`, `showed`) VALUES
(57, 67, 68, ' rr', ' rrrr', '', 0),
(56, 67, 68, ' rr', ' rrrr', '', 0),
(55, 67, 68, ' rr', ' rrrr', '', 0),
(54, 67, 68, ' rr', ' rrrr', '', 0),
(53, 67, 68, ' rr', ' rr', '', 0),
(52, 67, 68, ' rr', ' rr', '', 0),
(51, 67, 68, ' qq', ' qq', '', 0),
(50, 67, 68, ' hii', ' d', 'C:fakepathInkedScreenshot_20210427-003216_ES File Explorer_LI.jpg', 0),
(49, 68, 67, ' ee', ' ee', '', 0),
(48, 67, 68, ' ss', ' ss', '', 0),
(47, 67, 68, ' hi', ' how are you', '', 0),
(46, 67, 68, ' yo', ' yo', '', 0),
(45, 67, 68, ' ee', ' ee', '', 0),
(44, 68, 67, ' ge', ' rr', '', 0),
(43, 67, 68, ' dd', ' ddd', '', 0),
(42, 67, 68, ' hello', ' how are ypu', '', 0),
(58, 67, 68, ' rr', ' rrrr', '', 0),
(59, 67, 68, ' rr', ' rrrr', '', 0),
(60, 67, 68, ' rr', ' rrrr', '', 0),
(61, 67, 68, ' rr', ' rrrr', '', 0),
(62, 67, 68, ' tt', ' tt', '', 0),
(63, 67, 68, ' vv', ' vv', 'file_/889499186294.rdp_pass.txt', 0),
(64, 67, 68, ' vv', ' vv', 'file_/644036561091.rdp_pass.txt', 0),
(65, 67, 68, ' dd', ' dd', 'file_/784221918916.20210425_142407.jpg', 0),
(66, 67, 68, ' ss', ' ss', 'file_/625721811435.marek-piwnicki-oFu9stx-M9I-unsplash.jpg', 0),
(67, 68, 67, ' rr', ' rr', 'file_/40534856296.vs_community__1178724474.1622288703.exe', 0),
(68, 67, 68, ' ii', ' uu', 'file_/924621447070.1935ab15cc8e2ed50bcfeb5a26ad041d-5a50b461663b6e4768eb9e9cdb0fa7a1859b4e20.zip', 0),
(69, 67, 68, ' oo', ' oo', '', 0),
(70, 68, 67, ' pp', ' pp', '', 0),
(71, 67, 68, ' ee', ' ee', '', 0),
(72, 68, 67, ' kk', ' kk', '', 0),
(73, 68, 67, ' pp', ' pp', 'file_/409124104990.vs_community__1178724474.1622288703.exe', 0);

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `name` varchar(15) CHARACTER SET utf8 NOT NULL,
  `prenom` varchar(15) CHARACTER SET utf8 NOT NULL,
  `password` varchar(15) CHARACTER SET utf8 NOT NULL,
  `photo` varchar(40) CHARACTER SET utf8 NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `name`, `prenom`, `password`, `photo`, `status`, `email`) VALUES
(68, 'zz', 'zz', '123', 'profile_pic/235844191891.jpg', 0, 'zz@gmail.com'),
(67, 'amine', 'ben', '123', 'profile_pic/739256033697.jpg', 0, 'am@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `corby`
--
ALTER TABLE `corby`
  ADD PRIMARY KEY (`userID`,`msgID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT
--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
