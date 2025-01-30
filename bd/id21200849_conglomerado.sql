-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 13/02/2024 às 20:02
-- Versão do servidor: 10.5.20-MariaDB
-- Versão do PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `id21200849_conglomerado`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa`
--

CREATE TABLE `empresa` (
  `idEmpresa` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `Nome` varchar(100) NOT NULL DEFAULT 'Aquitans',
  `CNPJ` varchar(20) DEFAULT '0',
  `Cidade` varchar(45) DEFAULT 'NA',
  `UF` varchar(2) DEFAULT 'NA',
  `Ativo` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `empresa`
--

INSERT INTO `empresa` (`idEmpresa`, `Nome`, `CNPJ`, `Cidade`, `UF`, `Ativo`) VALUES
(1, 'Aquitans', '1223445123123', 'NA', 'NA', b'1');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estufa`
--

CREATE TABLE `estufa` (
  `idEstufa` int(11) UNSIGNED NOT NULL,
  `fk_idEmpresa` int(10) UNSIGNED NOT NULL,
  `Nome` varchar(50) DEFAULT 'Estufa',
  `Tipo` int(11) DEFAULT 0,
  `DiasCultivo` int(11) DEFAULT NULL,
  `TempAlvo` double NOT NULL DEFAULT 0,
  `UmiAlvo` double NOT NULL DEFAULT 0,
  `Status` tinyint(4) NOT NULL,
  `Notifs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`Notifs`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `estufa`
--

INSERT INTO `estufa` (`idEstufa`, `fk_idEmpresa`, `Nome`, `Tipo`, `DiasCultivo`, `TempAlvo`, `UmiAlvo`, `Status`, `Notifs`) VALUES
(1, 1, 'Estufa', 10, 7, 30.2, 57, 3, NULL),
(2, 1, 'update1', 0, 123, 76, 12, 0, NULL),
(3, 1, 'arduino', 1, 0, 29.9, 60, 1, NULL),
(4, 1, 'arduino2', 1, 5, 22.8, 75, 2, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `historico`
--

CREATE TABLE `historico` (
  `fk_idEstufa` int(10) UNSIGNED NOT NULL,
  `Momento` datetime NOT NULL,
  `Temp` double DEFAULT NULL,
  `Umi` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `historico`
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
(2, '2023-07-15 10:00:00', 2.1, 13),
(1, '2023-10-18 21:12:58', 26.2, 57),
(2, '2023-10-21 16:29:34', 23, 46),
(3, '2023-10-24 15:46:05', 29.8, 43),
(3, '2023-10-24 15:50:35', 29.9, 43),
(3, '2023-10-24 15:55:06', 30, 43),
(3, '2023-10-24 15:59:36', 30, 43),
(3, '2023-10-24 16:04:05', 29.9, 44),
(3, '2023-10-24 16:07:33', 30, 44),
(3, '2023-10-24 16:08:45', 30, 44),
(3, '2023-10-24 16:09:52', 30, 45),
(3, '2023-10-24 16:11:18', 30, 44),
(3, '2023-10-24 16:15:51', 30, 44),
(3, '2023-10-24 16:20:24', 30, 44),
(3, '2023-10-24 16:26:08', 30.1, 44),
(3, '2023-10-24 16:30:40', 30, 43),
(3, '2023-10-24 16:35:13', 30, 42),
(3, '2023-10-24 16:39:46', 30, 41),
(3, '2023-10-24 16:44:19', 30, 40),
(3, '2023-10-24 16:48:52', 30, 41),
(3, '2023-10-24 16:53:24', 29.9, 40),
(3, '2023-10-24 16:57:57', 29.9, 40),
(3, '2023-10-24 17:10:50', 29.9, 41),
(3, '2023-11-02 13:33:06', 24.6, 54),
(3, '2023-11-02 13:37:23', 24.6, 54),
(3, '2023-11-02 13:40:16', 24.7, 53),
(3, '2023-11-02 15:11:58', 24.7, 53),
(3, '2023-11-02 15:14:09', 25.2, 51),
(3, '2023-11-02 15:15:54', 25.2, 51),
(3, '2023-11-02 15:17:38', 25.2, 51),
(3, '2023-11-02 15:20:48', 25.2, 52),
(4, '2023-11-02 15:27:27', 25.9, 49),
(4, '2023-11-02 15:29:12', 26, 50),
(4, '2023-11-02 15:30:57', 26, 50),
(4, '2023-11-02 15:32:41', 25.9, 49),
(4, '2023-11-02 17:28:05', 26, 49),
(4, '2023-11-02 17:29:49', 25.9, 50),
(4, '2023-11-02 17:31:34', 25.8, 50),
(4, '2023-11-02 17:33:19', 25.9, 50),
(4, '2023-11-02 17:41:51', 25.9, 49),
(4, '2023-11-02 17:42:22', 25.9, 48),
(4, '2023-11-02 17:44:07', 26, 49),
(4, '2023-11-02 17:45:52', 26, 50),
(4, '2023-11-02 17:47:36', 26, 51),
(4, '2023-11-02 17:49:21', 26, 52),
(4, '2023-11-02 17:51:06', 26, 51),
(4, '2023-11-02 17:52:50', 26.1, 51),
(4, '2023-11-02 17:54:35', 26, 51),
(4, '2023-11-02 17:56:20', 26.1, 52),
(4, '2023-11-02 17:58:04', 26, 52),
(4, '2023-11-07 21:53:23', 25.4, 52),
(4, '2023-11-07 22:05:57', 25.7, 50),
(4, '2023-11-07 22:11:23', 25.8, 48),
(4, '2023-11-07 22:13:54', 25.8, 50),
(4, '2023-11-07 22:16:02', 25.8, 50),
(4, '2023-11-07 22:19:14', 25.8, 50),
(4, '2023-11-07 22:20:05', 25.8, 50),
(4, '2023-11-07 22:20:38', 25.8, 49),
(4, '2023-11-07 22:21:19', 25.8, 50),
(4, '2023-11-07 22:23:53', 25.8, 50),
(4, '2023-11-07 22:25:20', 25.8, 50),
(4, '2023-11-07 22:28:35', 25.8, 49),
(4, '2023-11-07 22:30:03', 25.8, 48);

-- --------------------------------------------------------

--
-- Estrutura para tabela `teste`
--

CREATE TABLE `teste` (
  `aaa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `teste`
--

INSERT INTO `teste` (`aaa`) VALUES
(1),
(1),
(1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuarios` int(11) NOT NULL,
  `fk_idEmpresa_u` int(10) UNSIGNED NOT NULL,
  `Nivel` int(10) UNSIGNED NOT NULL,
  `Nome` varchar(100) DEFAULT NULL,
  `Senha` varchar(100) DEFAULT NULL,
  `Ativo` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`idUsuarios`, `fk_idEmpresa_u`, `Nivel`, `Nome`, `Senha`, `Ativo`) VALUES
(4, 1, 0, 'José Ze Ze', 'Carocha', b'0'),
(8, 1, 1, 'Vladimir', 'Putin', b'0'),
(14, 1, 1, '', 'paçoca', b'1'),
(18, 1, 1, 'tes', 'aaa', b'1'),
(20, 1, 1, 'aaaa', '123', b'1'),
(21, 1, 1, 'mascote', '123', b'1'),
(28, 1, 1, 'teste', 'vagabundo', b'1'),
(29, 1, 1, 'leo', '123', b'1'),
(30, 1, 0, 'Gustavo Garone', 'Minze', b'1'),
(31, 1, 1, 'teste2', '123', b'1'),
(32, 1, 1, 'Anchieta', '123', b'1');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idEmpresa`);

--
-- Índices de tabela `estufa`
--
ALTER TABLE `estufa`
  ADD PRIMARY KEY (`idEstufa`),
  ADD KEY `fk_idEmpresa` (`fk_idEmpresa`);

--
-- Índices de tabela `historico`
--
ALTER TABLE `historico`
  ADD KEY `fk_idEstufa` (`fk_idEstufa`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuarios`),
  ADD UNIQUE KEY `Nome` (`Nome`),
  ADD KEY `fk_idEmpresa_u` (`fk_idEmpresa_u`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `estufa`
--
ALTER TABLE `estufa`
  ADD CONSTRAINT `fk_idEmpresa` FOREIGN KEY (`fk_idEmpresa`) REFERENCES `empresa` (`idEmpresa`);

--
-- Restrições para tabelas `historico`
--
ALTER TABLE `historico`
  ADD CONSTRAINT `historico_ibfk_1` FOREIGN KEY (`fk_idEstufa`) REFERENCES `estufa` (`idEstufa`);

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_idEmpresa_u` FOREIGN KEY (`fk_idEmpresa_u`) REFERENCES `empresa` (`idEmpresa`);

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`id21200849_admin`@`%` EVENT `delete_penultimate_record` ON SCHEDULE EVERY 1 HOUR STARTS '2023-10-18 21:02:08' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    -- Obtenha o penúltimo 'Momento'
    DECLARE penultimateMoment DATETIME DEFAULT NULL;
    SELECT Momento INTO penultimateMoment
    FROM historico
    ORDER BY Momento DESC
    LIMIT 1 OFFSET 1;

    -- Se encontramos o penúltimo registro, deletamos
    IF penultimateMoment IS NOT NULL THEN
        DELETE FROM historico WHERE Momento = penultimateMoment;
    END IF;
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
