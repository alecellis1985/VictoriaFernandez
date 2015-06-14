DROP DATABASE IF EXISTS `profesionales`;
CREATE DATABASE  IF NOT EXISTS `profesionales` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `profesionales`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: profesionales
-- ------------------------------------------------------
-- Server version	5.0.51b-community-nt-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Not dumping tablespaces as no INFORMATION_SCHEMA.FILES table on this server
--

--
-- Table structure for table `barrios`
--

DROP TABLE IF EXISTS `barrios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `barrios` (
  `barrioId` int(11) NOT NULL auto_increment,
  `departamentoId` int(11) NOT NULL,
  `barrioNombre` varchar(250) NOT NULL,
  PRIMARY KEY  (`barrioId`),
  UNIQUE KEY `barrioNombre` (`barrioNombre`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barrios`
--

LOCK TABLES `barrios` WRITE;
/*!40000 ALTER TABLE `barrios` DISABLE KEYS */;
INSERT INTO `barrios` VALUES (1,1,'Ciudad Vieja'),(3,1,'Centro'),(4,1,'Barrio Sur'),(5,1,'Cordón'),(6,1,'Palermo'),(7,1,'Parque Rodó'),(8,1,'Punta Carretas'),(9,1,'Pocitos'),(10,1,'Buceo'),(11,1,'Parque Batlle'),(12,1,'Villa Dolores'),(13,1,'Malvín'),(14,1,'Malvín Norte'),(15,1,'Punta Gorda'),(16,1,'Carrasco'),(17,1,'Carrasco Norte'),(18,1,'Bañados de Carrasco'),(19,1,'Maroñas'),(20,1,'Parque Guaraní'),(21,1,'Flor de Maroñas'),(22,1,'Las Canteras'),(23,1,'Punta de Rieles'),(24,1,'Bella Italia'),(25,1,'Jardines del Hipódromo'),(26,1,'Ituzaingó'),(27,1,'Unión'),(28,1,'Villa Española'),(29,1,'Mercado Modelo'),(30,1,'Bolívar'),(31,1,'Castro'),(32,1,'Pérez Castellanos'),(33,1,'Cerrito de la Victoria'),(34,1,'Las Acacias'),(35,1,'Aires Puros'),(36,1,'Casavalle'),(37,1,'Piedras Blancas'),(38,1,'Manga'),(39,1,'Toledo Chico'),(40,1,'Paso de las Duranas'),(41,1,'Peñarol'),(42,1,'Lavalleja'),(43,1,'Villa del Cerro'),(44,1,'Casabó'),(45,1,'Pajas Blancas'),(46,1,'La Paloma'),(47,1,'Tomkinson'),(48,1,'La Teja'),(49,1,'Prado'),(50,1,'Nueva Savona'),(51,1,'Capurro'),(52,1,'Bella Vista'),(53,1,'Arroyo Seco'),(54,1,'Aguada'),(55,1,'Reducto'),(56,1,'Atahualpa'),(57,1,'Jacinto Vera'),(58,1,'La Figurita'),(59,1,'Larrañaga'),(60,1,'La Blanqueada'),(61,1,'Villa Muñoz'),(62,1,'Retiro'),(63,1,'Goes'),(64,1,'La Comercial'),(65,1,'Tres Cruces'),(66,1,'Brazo Oriental'),(67,1,'Sayago'),(68,1,'Conciliación'),(69,1,'Belvedere'),(70,1,'Nuevo París'),(71,1,'Tres Ombúes'),(72,1,'Pueblo Victoria'),(73,1,'Paso de la Arena'),(74,1,'Santiago Vázquez'),(75,1,'Colón Sureste'),(76,1,'Abayubá'),(77,1,'Colón Centro y Noroeste'),(78,1,'Lezica'),(79,1,'Melilla'),(80,1,'Villa García'),(81,1,'Manga Rural');
/*!40000 ALTER TABLE `barrios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `categoriaId` int(11) NOT NULL auto_increment,
  `categoriaNombre` varchar(250) NOT NULL,
  PRIMARY KEY  (`categoriaId`),
  KEY `categoriaNombre` (`categoriaNombre`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT 	INTO `categorias` VALUES (1,"Abogados");
INSERT 	INTO `categorias` VALUES (2,"Agentes Inmobiliarios");
INSERT 	INTO `categorias` VALUES (3,"Adm. de Propiedades");
INSERT 	INTO `categorias` VALUES (4,"Agrimensores");
INSERT 	INTO `categorias` VALUES (5,"Arquitectos");
INSERT 	INTO `categorias` VALUES (6,"Biólogos");
INSERT 	INTO `categorias` VALUES (7,"Bioquímicos");
INSERT 	INTO `categorias` VALUES (8,"Contadores");
INSERT 	INTO `categorias` VALUES (9,"Corredores de Bolsa");
INSERT 	INTO `categorias` VALUES (10,"Corredores de Seguros");
INSERT 	INTO `categorias` VALUES (11,"Despachantes de Aduana");
INSERT 	INTO `categorias` VALUES (12,"Diseñadores Gráficos/Web");
INSERT 	INTO `categorias` VALUES (13,"Diseñadores de Interiores/Decoradores");
INSERT 	INTO `categorias` VALUES (14,"Diseñadores Indumentaria");
INSERT 	INTO `categorias` VALUES (15,"Diseñadores Industriales");
INSERT 	INTO `categorias` VALUES (16,"Escribanos");
INSERT 	INTO `categorias` VALUES (17,"Fotógrafos");
INSERT 	INTO `categorias` VALUES (18,"Gestores");
INSERT 	INTO `categorias` VALUES (19,"Ingeniero Agrónomo");
INSERT 	INTO `categorias` VALUES (20,"Ingenieros Civiles");
INSERT 	INTO `categorias` VALUES (21,"Ingenieros Eléctricos");
INSERT 	INTO `categorias` VALUES (22,"Ingenieros en Sistemas");
INSERT 	INTO `categorias` VALUES (23,"Ingenieros Industriales-Mecánicos");
INSERT 	INTO `categorias` VALUES (24,"Kinesiólogos");
INSERT 	INTO `categorias` VALUES (25,"Lic. en Administración");
INSERT 	INTO `categorias` VALUES (26,"Lic. en Comunicación");
INSERT 	INTO `categorias` VALUES (27,"Lic. en Comercio Exterior");
INSERT 	INTO `categorias` VALUES (28,"Lic. en Economía");
INSERT 	INTO `categorias` VALUES (29,"Lic. en Marketing");
INSERT 	INTO `categorias` VALUES (30,"Lic. en Nutrición");
INSERT 	INTO `categorias` VALUES (31,"Lic. en Publicidad");
INSERT 	INTO `categorias` VALUES (32,"Lic. en Sistemas");
INSERT 	INTO `categorias` VALUES (33,"Lic. en Turismo");
INSERT 	INTO `categorias` VALUES (34,"Locutores");
INSERT 	INTO `categorias` VALUES (35,"Médico Alergista");
INSERT 	INTO `categorias` VALUES (36,"Médicos Cardiólogos");
INSERT 	INTO `categorias` VALUES (37,"Médicos Cirujanos");
INSERT 	INTO `categorias` VALUES (38,"Médicos Clínicos");
INSERT 	INTO `categorias` VALUES (39,"Médico Deportólogo");
INSERT 	INTO `categorias` VALUES (40,"Médicos Dermatólogos");
INSERT 	INTO `categorias` VALUES (41,"Médicos Esp/ C. Plástica");
INSERT 	INTO `categorias` VALUES (42,"Médicos Esp/ Fertilidad");
INSERT 	INTO `categorias` VALUES (43,"Médico Fisioterapeuta");
INSERT 	INTO `categorias` VALUES (44,"Médico Fonoaudiólogo");
INSERT 	INTO `categorias` VALUES (45,"Médicos Gastroenterólogos");
INSERT 	INTO `categorias` VALUES (46,"Médicos Neurólogos");
INSERT 	INTO `categorias` VALUES (47,"Médicos Oftalmólogos");
INSERT 	INTO `categorias` VALUES (48,"Médicos Radiólogos");
INSERT 	INTO `categorias` VALUES (49,"Músicos");
INSERT 	INTO `categorias` VALUES (50,"Odontólogos");
INSERT 	INTO `categorias` VALUES (51,"Profesores de Inglés");
INSERT 	INTO `categorias` VALUES (52,"Profesores de Español");
INSERT 	INTO `categorias` VALUES (53,"Profesores de Portugués");
INSERT 	INTO `categorias` VALUES (54,"Profesores de Chino");
INSERT 	INTO `categorias` VALUES (55,"Psicólogos");
INSERT 	INTO `categorias` VALUES (56,"Psicopedagogos");
INSERT 	INTO `categorias` VALUES (57,"Químicos");
INSERT 	INTO `categorias` VALUES (58,"Rematadores");
INSERT 	INTO `categorias` VALUES (59,"Técnico Prevensionista");
INSERT 	INTO `categorias` VALUES (60,"Traductores");
INSERT 	INTO `categorias` VALUES (61,"Veterinarios");
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departamentos` (
  `idDepartamento` int(11) NOT NULL auto_increment,
  `nombreDepartamento` varchar(250) NOT NULL,
  PRIMARY KEY  (`idDepartamento`),
  UNIQUE KEY `nombreDepartamento` (`nombreDepartamento`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES (2,'Artigas'),(3,'Canelones'),(4,'Cerro Largo'),(5,'Colonia'),(6,'Durazno'),(7,'Flores'),(8,'Florida'),(9,'Lavalleja'),(10,'Maldonado'),(1,'Montevideo'),(11,'Paysandú'),(12,'Río Negro'),(13,'Rivera'),(14,'Rocha'),(15,'Salto'),(16,'San José'),(17,'Soriano'),(18,'Tacuarembó'),(19,'Treinta y Tres');
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diasatencion`
--

DROP TABLE IF EXISTS `diasatencion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diasatencion` (
  `iddiasAtencion` int(11) NOT NULL auto_increment,
  `idUser` int(11) NOT NULL,
  `lunes` tinyint(1) NOT NULL,
  `martes` tinyint(1) NOT NULL,
  `miercoles` tinyint(1) NOT NULL,
  `jueves` tinyint(1) NOT NULL,
  `viernes` tinyint(1) NOT NULL,
  `sabado` tinyint(1) NOT NULL,
  `domingo` tinyint(1) NOT NULL,
  `horaComienzo` time NOT NULL,
  `horaFin` time NOT NULL,
  PRIMARY KEY  (`iddiasAtencion`),
  KEY `diasatencion_users_idx` (`idUser`),
  CONSTRAINT `diasatencion_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diasatencion`
--

LOCK TABLES `diasatencion` WRITE;
/*!40000 ALTER TABLE `diasatencion` DISABLE KEYS */;
/*!40000 ALTER TABLE `diasatencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formasdepago`
--

DROP TABLE IF EXISTS `formasdepago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formasdepago` (
  `idformasDePago` int(11) NOT NULL auto_increment,
  `idUser` int(11) NOT NULL,
  `contado` tinyint(1) NOT NULL,
  `debito` tinyint(1) NOT NULL,
  `credito` tinyint(1) NOT NULL,
  `otras` tinyint(1) NOT NULL,
  PRIMARY KEY  (`idformasDePago`),
  KEY `formasdepago_users_idx` (`idUser`),
  CONSTRAINT `formasdepago_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formasdepago`
--

-- LOCK TABLES `formasdepago` WRITE;
-- /*!40000 ALTER TABLE `formasdepago` DISABLE KEYS */;
-- INSERT INTO `formasdepago` VALUES (1,20,0,0,0,0),(2,21,1,1,1,1),(3,22,0,0,0,0),(4,23,0,0,0,0),(5,24,0,0,0,0),(6,25,0,0,0,0);
-- /*!40000 ALTER TABLE `formasdepago` ENABLE KEYS */;
-- UNLOCK TABLES;

-- 
-- Table structure for table `plan`
-- 
DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plan` (
  `IdPlan` int(11) NOT NULL auto_increment,
  `Tipo` varchar(25) NOT NULL,
  `Categoria` varchar(25) NOT NULL,
  `Precio` int(11) NOT NULL,
  `DuracionPlan` varchar(15) NOT NULL,
  PRIMARY KEY  (`IdPlan`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

-- 
-- Dumping data for table `plan`
-- 

INSERT INTO `plan` VALUES (1, 'Profesional', 'Basico', 500, 'Mensual');
INSERT INTO `plan` VALUES (2, 'Profesional', 'Premium', 900, 'Mensual');
INSERT INTO `plan` VALUES (3, 'Profesional', 'Basico', 2400, 'Semestral');
INSERT INTO `plan` VALUES (4, 'Profesional', 'Basico', 3600, 'Anual');
INSERT INTO `plan` VALUES (5, 'Profesional', 'Premium', 4320, 'Semestral');
INSERT INTO `plan` VALUES (6, 'Profesional', 'Premium', 6480, 'Anual');
INSERT INTO `plan` VALUES (7, 'Empresarial', 'Basico', 800, 'Mensual');
INSERT INTO `plan` VALUES (8, 'Empresarial', 'Premium', 1200, 'Mensual');
INSERT INTO `plan` VALUES (9, 'Empresarial', 'Basico', 3840, 'Semestral');
INSERT INTO `plan` VALUES (10, 'Empresarial', 'Basico', 5760, 'Anual');
INSERT INTO `plan` VALUES (11, 'Empresarial', 'Premium', 5760, 'Semestral');
INSERT INTO `plan` VALUES (12, 'Empresarial', 'Premium', 8640, 'Anual');
--
-- Table structure for table `mapa`
--

DROP TABLE IF EXISTS `mapa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mapa` (
  `IdMapa` int(11) NOT NULL auto_increment,
  `IdUser` int(11) NOT NULL,
  `latitude` varchar(30) NOT NULL,
  `longitude` varchar(30) NOT NULL,
  PRIMARY KEY  (`IdMapa`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mapa`
--

LOCK TABLES `mapa` WRITE;
/*!40000 ALTER TABLE `mapa` DISABLE KEYS */;
INSERT INTO `mapa` VALUES (10,10,'-34.88719824359768','-56.13764762878418'),(11,10,'-34.88226973385945','-56.165971755981445'),(12,10,'-34.89564642972746','-56.16442680358887');
/*!40000 ALTER TABLE `mapa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `idUser` int(11) NOT NULL auto_increment,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `celular` varchar(100) NOT NULL,
  `direccion` varchar(100) default NULL,
  `telefonoEmp` varchar(100) NOT NULL,
  `departamento` int(3) NOT NULL,
  `categoria` int(3) NOT NULL,
  `barrio` int(3) default NULL,
  `plan` int(3) NOT NULL,
  `sitioWeb` varchar(100) NOT NULL,
  `imagenUrl` varchar(100) NOT NULL,
  `facebookUrl` varchar(250) default NULL,
  `twitterUrl` varchar(250) default NULL,
  `linkedinUrl` varchar(250) default NULL,
  `descService` varchar(150) NOT NULL,
  `servicioOfrecido1` varchar(20) default NULL,
  `servicioOfrecido2` varchar(20) default NULL,
  `servicioOfrecido3` varchar(20) default NULL,
  `servicioOfrecido4` varchar(20) default NULL,
  `servicioOfrecido5` varchar(20) default NULL,
  `servicioOfrecido6` varchar(20) default NULL,
  `descServiceLong` varchar(1000) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY  (`idUser`),
  UNIQUE KEY `username` (`username`),
  KEY `users_barrios_idx` (`barrio`),
  KEY `users_departamento_idx` (`departamento`),
  KEY `users_categoria_idx` (`categoria`),
  KEY `users_plan_idx` (`plan`),
  CONSTRAINT `users_plan` FOREIGN KEY (`plan`) REFERENCES `plan` (`IdPlan`) ON UPDATE CASCADE,
  CONSTRAINT `users_categoria` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`categoriaId`) ON UPDATE CASCADE,
  CONSTRAINT `users_barrios` FOREIGN KEY (`barrio`) REFERENCES `barrios` (`barrioId`) ON UPDATE CASCADE,
  CONSTRAINT `users_departamento` FOREIGN KEY (`departamento`) REFERENCES `departamentos` (`idDepartamento`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

ALTER TABLE  `users` ADD  `IsAdmin` TINYINT( 1 ) NOT NULL DEFAULT  '0' AFTER  `password` ;
ALTER TABLE  `users` ADD  `IsActive` TINYINT( 1 ) NOT NULL DEFAULT  '1' AFTER  `IsAdmin` ;

INSERT INTO  `profesionales`.`users` VALUES (
default ,  'Alec',  'Ellis',  'alecellis1985@hotmail.com',  '26013794',  '098635923',  'm.tajes 7530',  '26013794',  '2',  '1', NULL ,  '5',  '',  '',  'https://www.facebook.com/alec.ellis.714', NULL , NULL ,  'construccion de paginas web',  'SEO',  'OPTIMIZATION', NULL , NULL , NULL , NULL ,  'database performance optimization', MD5(  'turtleman1' ) , MD5(  'turtleman1' ),1,1
);
--
-- Dumping data for table `users`
--
-- Should add plan to every user to use this...
-- LOCK TABLES `users` WRITE;
-- /*!40000 ALTER TABLE `users` DISABLE KEYS */;
-- INSERT INTO `users` VALUES (12,'Alec','Ellis','alecellis1985@gmail.com','26013794','09865321','tajes 7530','303030303',2,1,NULL,'www.alec.com','logoJPG.jpg','https://www.facebook.com/alec.ellis.714','https://www.twitter.com','https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile','Brindo el mejor service que puedas ver en tu vida contratame ya!!!','afsaf','asfas','fasf','fasf','fasf','fasf','fasf','Palomo','15efd829b89e9eb2287901e77c2aae1d'),(13,'Sam','Gusto','elgroso@gmail.com','26013794','09865321','tajes 7530','303030303',2,1,NULL,'www.alec.com','logoJPG.jpg','https://www.facebook.com/alec.ellis.714','https://www.twitter.com','https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile','Por 3 mangos te doy clase las 24 horas, te llevo el carrito de panchos y todo lo que quieras a la hora que quieras. Se bailar y cantar pero no canto a','fasf','afsaf','asfas','fasf','fasf','fasf','fasf','El_Triste','pwpwpw'),(14,'Tomy','Potatoue','los_pi@gmail.com','26013794','09865321','tajes 7530','303030303',2,1,NULL,'www.alec.com','logoJPG.jpg','https://www.facebook.com/alec.ellis.714','https://www.twitter.com','https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile','afsaf','afsaf','asfas','fasf','fasf','fasf','fasf','fasf','Gomon','pwpwpw'),(15,'Charli','Gut','matoluzen@gmail.com','26013794','09865321','tajes 7530','303030303',2,1,NULL,'www.alec.com','logoJPG.jpg','https://www.facebook.com/alec.ellis.714','https://www.twitter.com','https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile','afsaf','afsaf','asfas','fasf','fasf','fasf','fasf','fasf','Alexander','pwpwpw'),(16,'Juan','Gonzales','elgonchi@gmail.com','262321651','09861651','tucuman 2121','6251651651',2,1,NULL,'wawa.com.uy','logoJPG.jpg','https://www.facebook.com/alec.ellis.714','https://www.twitter.com','https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile','afsaf','asfa','fasfas','asfaf','fasf','fasf','fasf','fasf','El_Gonchi','ahfahf'),(17,'Terry','Fierry','el_garca@gmail.com','262321651','09861651','tucuman 2121','6251651651',2,1,NULL,'wawa.com.uy','logoJPG.jpg','','https://www.twitter.com','https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile','afsaf','asfa','fasfas','asfaf','fasf','fasf','fasf','fasf','El_Tierri','zukulu'),(18,'BinAD','Ladennw','alecellis1985@gmail.com','26013794','098635923','Maximo tajen 3565','26013794',2,1,NULL,'','','','','','qcpdEXwvoSTaqqSxKkBFQPSxrjJcLhpUgOoZFRKuOsOIpXzzuw','vxlvwXZOKZKLrUlcuusu','NXJPWGYJzUNZDACXkgDo','trSfWKgWkXIYJtLElBsA','LSyjbXeRmkYDwaCVIAsq','djYguRtulZwpstZDYzow','zMYvRrVKXzKAPWGrsxAJ','fasf','BspcijE','a8f5f167f44f4964e6c998dee827110c'),(19,'Binkg','LadeneP','alecellis1985@gmail.com','26013794','098635923','Maximo tajen 3565','26013794',2,2,NULL,'','','','','https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile','iJvKNLEmUFpfARQGjWxPjQFhReYRPLeUTnyeHezyVDYboFClpO','gmhtcJLGGEBMlFBgRfVK','UQoQoMAlhQxoWVrCpAyI','qIBMfQfbGqpXbvXFqrKs','piKfAawYfRCuzdcTJOhK','XpXiUaAzxCCdyFlflNfW','larZYrIPksrMTDKXSLSD','fasf','AJFuihD','a8f5f167f44f4964e6c998dee827110c'),(20,'BinWY','LadenMk','alecellis1985@gmail.com','26013794','098635923','Maximo tajen 3565','26013794',3,2,NULL,'','','','','','','','','','','','','','ehNDzsb','a8f5f167f44f4964e6c998dee827110c'),(21,'BinQa','LadenQw','alecellis1985@gmail.com','26013794','098635923','Maximo tajen 3565','26013794',2,2,NULL,'','','','','','','','','','','','','','JmddKRN','a8f5f167f44f4964e6c998dee827110c'),(22,'BinPL','LadenzG','alecellis1985@gmail.com','26013794','098635923','Maximo tajen 3565','26013794',2,2,NULL,'','','','','','','','','','','','','','aIlkhYo','a8f5f167f44f4964e6c998dee827110c'),(23,'BinWH','LadendD','alecellis1985@gmail.com','26013794','098635923','Maximo tajen 3565','26013794',2,2,NULL,'','','','','','','','','','','','','','AypaNRD','a8f5f167f44f4964e6c998dee827110c'),(24,'Bincw','LadentX','alecellis1985@gmail.com','26013794','098635923','Maximo tajen 3565','26013794',2,2,NULL,'','','','','','','','','','','','','','sdPSmOi','a8f5f167f44f4964e6c998dee827110c'),(25,'Bingd','LadenPf','alecellis1985@gmail.com','26013794','098635923','Maximo tajen 3565','26013794',2,2,NULL,'','','','','','','','','','','','','','yAvwMxn','a8f5f167f44f4964e6c998dee827110c');
-- /*!40000 ALTER TABLE `users` ENABLE KEYS */;
-- UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-04-23 13:51:30
