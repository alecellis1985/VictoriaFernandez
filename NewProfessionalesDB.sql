DROP DATABASE IF EXISTS `profesionales`;
CREATE DATABASE `profesionales` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `profesionales`;
-- MySQL dump 10.13  Distrib 5.5.44, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: profesionales
-- ------------------------------------------------------
-- Server version	5.5.44-0ubuntu0.14.04.1

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
-- Table structure for table `barrios`
--

DROP TABLE IF EXISTS `barrios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `barrios` (
  `barrioId` int(11) NOT NULL AUTO_INCREMENT,
  `departamentoId` int(11) NOT NULL,
  `barrioNombre` varchar(250) NOT NULL,
  PRIMARY KEY (`barrioId`),
  KEY `depto` (`departamentoId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barrios`
--

LOCK TABLES `barrios` WRITE;
/*!40000 ALTER TABLE `barrios` DISABLE KEYS */;
INSERT INTO `barrios` VALUES (1,1,'Ciudad Vieja'),(3,1,'Centro'),(4,1,'Barrio Sur'),(5,1,'Cordón'),(6,1,'Palermo'),(7,1,'Parque Rodó'),(8,1,'Punta Carretas'),(9,1,'Pocitos'),(10,1,'Buceo'),(11,1,'Parque Batlle'),(12,1,'Villa Dolores'),(13,1,'Malvín'),(14,1,'Malvín Norte'),(15,1,'Punta Gorda'),(16,1,'Carrasco'),(17,1,'Carrasco Norte'),(18,1,'Bañados de Carrasco'),(19,1,'Maroñas'),(20,1,'Parque Guaraní'),(21,1,'Flor de Maroñas'),(22,1,'Las Canteras'),(23,1,'Punta de Rieles'),(24,1,'Bella Italia'),(25,1,'Jardines del Hipódromo'),(26,1,'Ituzaingó'),(27,1,'Unión'),(28,1,'Villa Española'),(29,1,'Mercado Modelo'),(30,1,'Bolívar'),(31,1,'Castro'),(32,1,'Pérez Castellanos'),(33,1,'Cerrito de la Victoria'),(34,1,'Las Acacias'),(35,1,'Aires Puros'),(36,1,'Casavalle'),(37,1,'Piedras Blancas'),(38,1,'Manga'),(39,1,'Toledo Chico'),(40,1,'Paso de las Duranas'),(41,1,'Peñarol'),(42,1,'Lavalleja'),(43,1,'Villa del Cerro'),(44,1,'Casabó'),(45,1,'Pajas Blancas'),(46,1,'La Paloma'),(47,1,'Tomkinson'),(48,1,'La Teja'),(49,1,'Prado'),(50,1,'Nueva Savona'),(51,1,'Capurro'),(52,1,'Bella Vista'),(53,1,'Arroyo Seco'),(54,1,'Aguada'),(55,1,'Reducto'),(56,1,'Atahualpa'),(57,1,'Jacinto Vera'),(58,1,'La Figurita'),(59,1,'Larrañaga'),(60,1,'La Blanqueada'),(61,1,'Villa Muñoz'),(62,1,'Retiro'),(63,1,'Goes'),(64,1,'La Comercial'),(65,1,'Tres Cruces'),(66,1,'Brazo Oriental'),(67,1,'Sayago'),(68,1,'Conciliación'),(69,1,'Belvedere'),(70,1,'Nuevo París'),(71,1,'Tres Ombúes'),(72,1,'Pueblo Victoria'),(73,1,'Paso de la Arena'),(74,1,'Santiago Vázquez'),(75,1,'Colón Sureste'),(76,1,'Abayubá'),(77,1,'Colón Centro y Noroeste'),(78,1,'Lezica'),(79,1,'Melilla'),(80,1,'Villa García'),(81,1,'Manga Rural'),(82,2,'default'),(93,3,'default'),(94,4,'default'),(95,5,'default'),(96,6,'default'),(97,7,'default'),(98,8,'default'),(99,9,'default'),(100,10,'default'),(101,11,'default'),(102,12,'default'),(103,13,'default'),(104,14,'default'),(105,15,'default'),(106,16,'default'),(107,17,'default'),(108,18,'default'),(109,19,'default');
/*!40000 ALTER TABLE `barrios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_usuario`
--

DROP TABLE IF EXISTS `categoria_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria_usuario` (
  `idCategoria` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`idCategoria`,`idUser`),
  KEY `fk_user_idx` (`idUser`),
  CONSTRAINT `fk_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`categoriaId`),
  CONSTRAINT `fk_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_usuario`
--

LOCK TABLES `categoria_usuario` WRITE;
/*!40000 ALTER TABLE `categoria_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `categoriaId` int(11) NOT NULL AUTO_INCREMENT,
  `categoriaNombre` varchar(250) NOT NULL,
  PRIMARY KEY (`categoriaId`),
  KEY `categoriaNombre` (`categoriaNombre`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Abogados'),(3,'Administradores de Propiedades'),(2,'Agentes Inmobiliarios'),(4,'Arquitectos'),(5,'Biólogos'),(6,'Bioquímicos y Químicos'),(7,'Contadores'),(8,'Corredores de Bolsa'),(9,'Corredores de Seguros'),(10,'Despachantes de Aduana'),(13,'Diseñadores de Indumentaria'),(12,'Diseñadores de Interiores y Decoradores'),(11,'Diseñadores Gráficos y Web'),(14,'Diseñadores Industriales'),(15,'Escribanos'),(16,'Inegenieros Agrimensores'),(17,'Ingenieros Agrónomos'),(18,'Ingenieros Civiles'),(19,'Ingenieros Eléctricos'),(20,'Ingenieros en Sistemas'),(21,'Ingenieros Industriales - Mecánicos'),(22,'Licenciados en Administración'),(24,'Licenciados En Comercio Exterior'),(23,'Licenciados en Comunicación'),(25,'Licenciados en Economía'),(26,'Licenciados en Fisioterapia'),(27,'Licenciados en Fonoaudiología'),(28,'Licenciados en Marketing'),(29,'Licenciados en Nutrición'),(31,'Licenciados en Psicomotricidad'),(30,'Licenciados en Publicidad'),(32,'Licenciados en Sistemas'),(33,'Licenciados en Turismo'),(34,'Médicos Alergistas'),(35,'Médicos Cardiólogos'),(36,'Médicos Cirujanos'),(40,'Médicos Cirujanos Plásticos'),(37,'Médicos Clínicos'),(38,'Médicos Deportólogos'),(39,'Médicos Dermatólogos'),(41,'Médicos Especialistas en Fertilidad'),(42,'Médicos Fisiatras'),(43,'Médicos Gastroenterólogos'),(44,'Médicos Neurólogos'),(45,'Médicos Oftalmólogos'),(46,'Médicos Radiólogos'),(47,'Odontólogos'),(51,'Profesores de Chino'),(49,'Profesores de Español'),(48,'Profesores de Inglés'),(50,'Profesores de Portugués'),(52,'Psicólogos'),(53,'Psicopedagogos'),(54,'Rematadores'),(55,'Técnicos Prevensionistas'),(56,'Traductores'),(57,'Veterinarios');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento_user`
--

DROP TABLE IF EXISTS `departamento_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departamento_user` (
  `idUser` int(11) NOT NULL,
  `idBarrio` int(11) NOT NULL,
  PRIMARY KEY (`idUser`,`idBarrio`),
  KEY `fk_deptoBarrio_idx` (`idBarrio`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`),
  CONSTRAINT `fk_barrio` FOREIGN KEY (`idBarrio`) REFERENCES `barrios` (`barrioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento_user`
--

LOCK TABLES `departamento_user` WRITE;
/*!40000 ALTER TABLE `departamento_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `departamento_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departamentos` (
  `idDepartamento` int(11) NOT NULL AUTO_INCREMENT,
  `nombreDepartamento` varchar(250) NOT NULL,
  PRIMARY KEY (`idDepartamento`),
  UNIQUE KEY `nombreDepartamento` (`nombreDepartamento`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
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
  `iddiasAtencion` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`iddiasAtencion`),
  KEY `diasatencion_users_idx` (`idUser`),
  CONSTRAINT `diasatencion_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diasatencion`
--

LOCK TABLES `diasatencion` WRITE;
/*!40000 ALTER TABLE `diasatencion` DISABLE KEYS */;
INSERT INTO `diasatencion` VALUES (3,3,0,0,1,1,1,1,0,'08:00:00','14:00:00'),(8,2,0,0,1,1,1,1,0,'08:00:00','12:00:00');
/*!40000 ALTER TABLE `diasatencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formasdepago`
--

DROP TABLE IF EXISTS `formasdepago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formasdepago` (
  `idformasDePago` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `contado` tinyint(1) NOT NULL,
  `debito` tinyint(1) NOT NULL,
  `credito` tinyint(1) NOT NULL,
  `otras` varchar(30) NOT NULL,
  PRIMARY KEY (`idformasDePago`),
  KEY `formasdepago_users_idx` (`idUser`),
  CONSTRAINT `formasdepago_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formasdepago`
--

LOCK TABLES `formasdepago` WRITE;
/*!40000 ALTER TABLE `formasdepago` DISABLE KEYS */;
INSERT INTO `formasdepago` VALUES (3,3,1,1,0,'dawdaw'),(8,2,1,1,0,'queso');
/*!40000 ALTER TABLE `formasdepago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mapa`
--

DROP TABLE IF EXISTS `mapa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mapa` (
  `IdMapa` int(11) NOT NULL AUTO_INCREMENT,
  `IdUser` int(11) NOT NULL,
  `latitude` varchar(30) NOT NULL,
  `longitude` varchar(30) NOT NULL,
  PRIMARY KEY (`IdMapa`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mapa`
--

LOCK TABLES `mapa` WRITE;
/*!40000 ALTER TABLE `mapa` DISABLE KEYS */;
INSERT INTO `mapa` VALUES (10,10,'-34.88719824359768','-56.13764762878418'),(11,10,'-34.88226973385945','-56.165971755981445'),(12,10,'-34.89564642972746','-56.16442680358887'),(18,2,'-34.892548862348036','-56.15618705749512');
/*!40000 ALTER TABLE `mapa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plan` (
  `IdPlan` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(25) NOT NULL,
  `Categoria` varchar(25) NOT NULL,
  `Precio` int(11) NOT NULL,
  `DuracionPlan` varchar(15) NOT NULL,
  PRIMARY KEY (`IdPlan`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (1,'Profesional','Basico',500,'Mensual'),(2,'Profesional','Premium',900,'Mensual'),(3,'Profesional','Basico',2400,'Semestral'),(4,'Profesional','Basico',3600,'Anual'),(5,'Profesional','Premium',4320,'Semestral'),(6,'Profesional','Premium',6480,'Anual'),(7,'Empresarial','Basico',800,'Mensual'),(8,'Empresarial','Premium',1200,'Mensual'),(9,'Empresarial','Basico',3840,'Semestral'),(10,'Empresarial','Basico',5760,'Anual'),(11,'Empresarial','Premium',5760,'Semestral'),(12,'Empresarial','Premium',8640,'Anual');
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `celular` varchar(100) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefonoEmp` varchar(100) NOT NULL,
  `plan` int(3) NOT NULL,
  `sitioWeb` varchar(100) NOT NULL,
  `imagenUrl` varchar(100) NOT NULL,
  `facebookUrl` varchar(250) DEFAULT NULL,
  `twitterUrl` varchar(250) DEFAULT NULL,
  `linkedinUrl` varchar(250) DEFAULT NULL,
  `descService` varchar(150) NOT NULL,
  `servicioOfrecido1` varchar(20) DEFAULT NULL,
  `servicioOfrecido2` varchar(20) DEFAULT NULL,
  `servicioOfrecido3` varchar(20) DEFAULT NULL,
  `servicioOfrecido4` varchar(20) DEFAULT NULL,
  `servicioOfrecido5` varchar(20) DEFAULT NULL,
  `servicioOfrecido6` varchar(20) DEFAULT NULL,
  `descServiceLong` varchar(1000) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `IsAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `IsActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `users_plan_idx` (`plan`),
  CONSTRAINT `users_plan` FOREIGN KEY (`plan`) REFERENCES `plan` (`IdPlan`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alec','Ellis','alecellis1985@hotmail.com','26013794','098635923','m.tajes 7530','26013794',5,'','','https://www.facebook.com/alec.ellis.714',NULL,NULL,'construccion de paginas web','SEO','OPTIMIZATION',NULL,NULL,NULL,NULL,'database performance optimization','Alec10','1e280ae7584758f2efd35319690db75b',1,1),(2,'PruebaNombre','PruebaApellido','prueba@gmail.com','00000000000','0000000000000000000','prueba 1111','11111111111',1,'http://www.prueba.com','793b899a4f8fdf8109b9b0e71aa0f28e_3f1b7ccad63d40a7b4c27dda225bf941.YTS','http://www.pruebaFB.com','http://www.pruebaTW.com','http://www.pruebaLNK.com','Desc Prueba 1','pureba clave 1','pureba clave 2','pureba clave 3','pureba clave 4','pureba clave 5','pureba clave 6','detalles prueba','prueba1','3f1b7ccad63d40a7b4c27dda225bf941',0,1),(3,'empresaprueba','LadenON','empresaprueba1@gmail.com','26013794','098635923','empresaprueba1 dir','000000000001',7,'http://www.empresaprueba1.com','793b899a4f8fdf8109b9b0e71aa0f28e_a0408dd3baa0f0861abb80e7f48db196.YTS','http://www.empresaprueba1fb.com','http://www.empresaprueba1tw.com','http://www.empresaprueba1lnk.com','desc http://www.empresaprueba1.com','clar empr1','clar empr2','clar empr3','clar empr4','clar empr5','clar empr6','desc clar empr1','empresaprueba1','a0408dd3baa0f0861abb80e7f48db196',0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-23  1:29:42
