-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02-Ago-2023 às 02:21
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `aquitans`
--
CREATE DATABASE IF NOT EXISTS `aquitans` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `aquitans`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa`
--

CREATE TABLE `empresa` (
  `idEmpresa` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `Nome` varchar(100) NOT NULL DEFAULT 'Aquitans',
  `CNPJ` varchar(20) DEFAULT '0',
  `Cidade` varchar(45) DEFAULT 'NA',
  `UF` varchar(2) DEFAULT 'NA',
  `Ativo` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `empresa`
--

INSERT INTO `empresa` (`idEmpresa`, `Nome`, `CNPJ`, `Cidade`, `UF`, `Ativo`) VALUES
(1, 'Aquitans', '1223445123123', 'NA', 'NA', b'1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `estufa`
--

CREATE TABLE `estufa` (
  `idEstufa` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `fk_idEmpresa` int(10) UNSIGNED NOT NULL,
  `Nome` varchar(50) DEFAULT 'Estufa',
  `Tipo` int(11) DEFAULT 0,
  `DiasCultivo` int(11) DEFAULT NULL,
  `TempAlvo` double NOT NULL DEFAULT 0,
  `UmiAlvo` double NOT NULL DEFAULT 0,
  `Status` tinyint(4) NOT NULL,
  `Notifs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`Notifs`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `estufa`
--

INSERT INTO `estufa` (`idEstufa`, `fk_idEmpresa`, `Nome`, `Tipo`, `DiasCultivo`, `TempAlvo`, `UmiAlvo`, `Status`, `Notifs`) VALUES
(1, 1, 'Estufa', 10, 7, 23, 49, 1, NULL),
(2, 1, 'Claudio', 1, 14, 25.3, 72, 2, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `historico`
--

CREATE TABLE `historico` (
  `fk_idEstufa` int(10) UNSIGNED NOT NULL,
  `Momento` datetime NOT NULL,
  `Temp` double DEFAULT NULL,
  `Umi` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `historico`
--

INSERT INTO `historico` (`fk_idEstufa`, `Momento`, `Temp`, `Umi`) VALUES
(1, '2023-07-14 15:00:00', 18.2, 45),
(1, '2023-07-14 16:00:00', 20.1, 48),
(1, '2023-07-14 17:00:00', 19.5, 50),
(1, '2023-07-14 18:00:00', 17.8, 47),
(1, '2023-07-14 19:00:00', 16.9, 43),
(1, '2023-07-14 20:00:00', 15.7, 42),
(1, '2023-07-14 21:00:00', 14.8, 40),
(1, '2023-07-14 22:00:00', 13.9, 38),
(1, '2023-07-14 23:00:00', 12.7, 36),
(1, '2023-07-15 00:00:00', 11.5, 34),
(1, '2023-07-15 01:00:00', 10.4, 32),
(1, '2023-07-15 02:00:00', 9.3, 30),
(1, '2023-07-15 03:00:00', 8.1, 28),
(1, '2023-07-15 04:00:00', 7.2, 26),
(1, '2023-07-15 05:00:00', 6.5, 24),
(1, '2023-07-15 06:00:00', 5.8, 22),
(1, '2023-07-15 07:00:00', 4.9, 20),
(1, '2023-07-15 08:00:00', 4.1, 18),
(1, '2023-07-15 09:00:00', 3.3, 16),
(1, '2023-07-15 10:00:00', 2.5, 14),
(2, '2023-07-14 15:00:00', 17.3, 44),
(2, '2023-07-14 16:00:00', 19.8, 47),
(2, '2023-07-14 17:00:00', 18.9, 49),
(2, '2023-07-14 18:00:00', 16.4, 46),
(2, '2023-07-14 19:00:00', 15.6, 42),
(2, '2023-07-14 20:00:00', 14.2, 41),
(2, '2023-07-14 21:00:00', 13.4, 39),
(2, '2023-07-14 22:00:00', 12.6, 37),
(2, '2023-07-14 23:00:00', 11.8, 35),
(2, '2023-07-15 00:00:00', 10.9, 33),
(2, '2023-07-15 01:00:00', 9.8, 31),
(2, '2023-07-15 02:00:00', 8.7, 29),
(2, '2023-07-15 03:00:00', 7.6, 27),
(2, '2023-07-15 04:00:00', 6.8, 25),
(2, '2023-07-15 05:00:00', 6.1, 23),
(2, '2023-07-15 06:00:00', 5.3, 21),
(2, '2023-07-15 07:00:00', 4.5, 19),
(2, '2023-07-15 08:00:00', 3.7, 17),
(2, '2023-07-15 09:00:00', 2.9, 15),
(2, '2023-07-15 10:00:00', 2.1, 13);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuarios` int(10) UNSIGNED NOT NULL,
  `fk_idEmpresa_u` int(10) UNSIGNED NOT NULL,
  `Nivel` int(10) UNSIGNED NOT NULL,
  `Nome` varchar(100) DEFAULT NULL,
  `Senha` varchar(100) DEFAULT NULL,
  `Ativo` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`idUsuarios`, `fk_idEmpresa_u`, `Nivel`, `Nome`, `Senha`, `Ativo`) VALUES
(1, 1, 1, 'Pedro', '123', b'1');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idEmpresa`);

--
-- Índices para tabela `estufa`
--
ALTER TABLE `estufa`
  ADD PRIMARY KEY (`idEstufa`),
  ADD KEY `fk_idEmpresa` (`fk_idEmpresa`);

--
-- Índices para tabela `historico`
--
ALTER TABLE `historico`
  ADD KEY `fk_idEstufa` (`fk_idEstufa`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuarios`),
  ADD KEY `fk_idEmpresa_u` (`fk_idEmpresa_u`);

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `estufa`
--
ALTER TABLE `estufa`
  ADD CONSTRAINT `fk_idEmpresa` FOREIGN KEY (`fk_idEmpresa`) REFERENCES `empresa` (`idEmpresa`);

--
-- Limitadores para a tabela `historico`
--
ALTER TABLE `historico`
  ADD CONSTRAINT `fk_idEstufa` FOREIGN KEY (`fk_idEstufa`) REFERENCES `estufa` (`idEstufa`);

--
-- Limitadores para a tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_idEmpresa_u` FOREIGN KEY (`fk_idEmpresa_u`) REFERENCES `empresa` (`idEmpresa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
