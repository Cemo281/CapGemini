

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Table structure for table `Coordonnées`
--

CREATE TABLE `coordonnees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` varchar(100) NOT NULL,
  `longitude` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


--
-- Table structure for table `pmr`
--

CREATE TABLE `pmr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `quantite` int(11) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `coordonnees_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `jeux_ibfk_1` FOREIGN KEY (`coordonnees_id`) REFERENCES `coordonnees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `utilisateur_id` int(11) NOT NULL,
  `pmr_id` int(11) NOT NULL,
  `reservation` int(11) NOT NULL,
  PRIMARY KEY (`utilisateur_id`,`pmr_id`),
  KEY `pmr_id` (`pmr_id`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`),
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`pmr_id`) REFERENCES `pmr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
