-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- Servidor: localhost
-- Tiempo de generación: 20-04-2015 a las 20:17:22
-- Versión del servidor: 5.0.51
-- Versión de PHP: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Base de datos: `angular_tutorial`
-- 

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `barrios`
-- 

CREATE TABLE IF NOT EXISTS `barrios` (
  `barrioId` int(11) NOT NULL auto_increment,
  `departamentoId` int(11) NOT NULL,
  `barrioNombre` varchar(250) NOT NULL,
  PRIMARY KEY  (`barrioId`),
  UNIQUE KEY `barrioNombre` (`barrioNombre`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=82 ;

-- 
-- Volcar la base de datos para la tabla `barrios`
-- 

INSERT INTO `barrios` VALUES (1, 1, 'Ciudad Vieja');
INSERT INTO `barrios` VALUES (3, 1, 'Centro');
INSERT INTO `barrios` VALUES (4, 1, 'Barrio Sur');
INSERT INTO `barrios` VALUES (5, 1, 'Cordón');
INSERT INTO `barrios` VALUES (6, 1, 'Palermo');
INSERT INTO `barrios` VALUES (7, 1, 'Parque Rodó');
INSERT INTO `barrios` VALUES (8, 1, 'Punta Carretas');
INSERT INTO `barrios` VALUES (9, 1, 'Pocitos');
INSERT INTO `barrios` VALUES (10, 1, 'Buceo');
INSERT INTO `barrios` VALUES (11, 1, 'Parque Batlle');
INSERT INTO `barrios` VALUES (12, 1, 'Villa Dolores');
INSERT INTO `barrios` VALUES (13, 1, 'Malvín');
INSERT INTO `barrios` VALUES (14, 1, 'Malvín Norte');
INSERT INTO `barrios` VALUES (15, 1, 'Punta Gorda');
INSERT INTO `barrios` VALUES (16, 1, 'Carrasco');
INSERT INTO `barrios` VALUES (17, 1, 'Carrasco Norte');
INSERT INTO `barrios` VALUES (18, 1, 'Bañados de Carrasco');
INSERT INTO `barrios` VALUES (19, 1, 'Maroñas');
INSERT INTO `barrios` VALUES (20, 1, 'Parque Guaraní');
INSERT INTO `barrios` VALUES (21, 1, 'Flor de Maroñas');
INSERT INTO `barrios` VALUES (22, 1, 'Las Canteras');
INSERT INTO `barrios` VALUES (23, 1, 'Punta de Rieles');
INSERT INTO `barrios` VALUES (24, 1, 'Bella Italia');
INSERT INTO `barrios` VALUES (25, 1, 'Jardines del Hipódromo');
INSERT INTO `barrios` VALUES (26, 1, 'Ituzaingó');
INSERT INTO `barrios` VALUES (27, 1, 'Unión');
INSERT INTO `barrios` VALUES (28, 1, 'Villa Española');
INSERT INTO `barrios` VALUES (29, 1, 'Mercado Modelo');
INSERT INTO `barrios` VALUES (30, 1, 'Bolívar');
INSERT INTO `barrios` VALUES (31, 1, 'Castro');
INSERT INTO `barrios` VALUES (32, 1, 'Pérez Castellanos');
INSERT INTO `barrios` VALUES (33, 1, 'Cerrito de la Victoria');
INSERT INTO `barrios` VALUES (34, 1, 'Las Acacias');
INSERT INTO `barrios` VALUES (35, 1, 'Aires Puros');
INSERT INTO `barrios` VALUES (36, 1, 'Casavalle');
INSERT INTO `barrios` VALUES (37, 1, 'Piedras Blancas');
INSERT INTO `barrios` VALUES (38, 1, 'Manga');
INSERT INTO `barrios` VALUES (39, 1, 'Toledo Chico');
INSERT INTO `barrios` VALUES (40, 1, 'Paso de las Duranas');
INSERT INTO `barrios` VALUES (41, 1, 'Peñarol');
INSERT INTO `barrios` VALUES (42, 1, 'Lavalleja');
INSERT INTO `barrios` VALUES (43, 1, 'Villa del Cerro');
INSERT INTO `barrios` VALUES (44, 1, 'Casabó');
INSERT INTO `barrios` VALUES (45, 1, 'Pajas Blancas');
INSERT INTO `barrios` VALUES (46, 1, 'La Paloma');
INSERT INTO `barrios` VALUES (47, 1, 'Tomkinson');
INSERT INTO `barrios` VALUES (48, 1, 'La Teja');
INSERT INTO `barrios` VALUES (49, 1, 'Prado');
INSERT INTO `barrios` VALUES (50, 1, 'Nueva Savona');
INSERT INTO `barrios` VALUES (51, 1, 'Capurro');
INSERT INTO `barrios` VALUES (52, 1, 'Bella Vista');
INSERT INTO `barrios` VALUES (53, 1, 'Arroyo Seco');
INSERT INTO `barrios` VALUES (54, 1, 'Aguada');
INSERT INTO `barrios` VALUES (55, 1, 'Reducto');
INSERT INTO `barrios` VALUES (56, 1, 'Atahualpa');
INSERT INTO `barrios` VALUES (57, 1, 'Jacinto Vera');
INSERT INTO `barrios` VALUES (58, 1, 'La Figurita');
INSERT INTO `barrios` VALUES (59, 1, 'Larrañaga');
INSERT INTO `barrios` VALUES (60, 1, 'La Blanqueada');
INSERT INTO `barrios` VALUES (61, 1, 'Villa Muñoz');
INSERT INTO `barrios` VALUES (62, 1, 'Retiro');
INSERT INTO `barrios` VALUES (63, 1, 'Goes');
INSERT INTO `barrios` VALUES (64, 1, 'La Comercial');
INSERT INTO `barrios` VALUES (65, 1, 'Tres Cruces');
INSERT INTO `barrios` VALUES (66, 1, 'Brazo Oriental');
INSERT INTO `barrios` VALUES (67, 1, 'Sayago');
INSERT INTO `barrios` VALUES (68, 1, 'Conciliación');
INSERT INTO `barrios` VALUES (69, 1, 'Belvedere');
INSERT INTO `barrios` VALUES (70, 1, 'Nuevo París');
INSERT INTO `barrios` VALUES (71, 1, 'Tres Ombúes');
INSERT INTO `barrios` VALUES (72, 1, 'Pueblo Victoria');
INSERT INTO `barrios` VALUES (73, 1, 'Paso de la Arena');
INSERT INTO `barrios` VALUES (74, 1, 'Santiago Vázquez');
INSERT INTO `barrios` VALUES (75, 1, 'Colón Sureste');
INSERT INTO `barrios` VALUES (76, 1, 'Abayubá');
INSERT INTO `barrios` VALUES (77, 1, 'Colón Centro y Noroeste');
INSERT INTO `barrios` VALUES (78, 1, 'Lezica');
INSERT INTO `barrios` VALUES (79, 1, 'Melilla');
INSERT INTO `barrios` VALUES (80, 1, 'Villa García');
INSERT INTO `barrios` VALUES (81, 1, 'Manga Rural');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `categorias`
-- 

CREATE TABLE IF NOT EXISTS `categorias` (
  `categoriaId` int(11) NOT NULL auto_increment,
  `categoriaNombre` varchar(250) NOT NULL,
  PRIMARY KEY  (`categoriaId`),
  KEY `categoriaNombre` (`categoriaNombre`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

-- 
-- Volcar la base de datos para la tabla `categorias`
-- 

INSERT INTO `categorias` VALUES (1, 'Abogados');
INSERT INTO `categorias` VALUES (2, 'Alambradores');
INSERT INTO `categorias` VALUES (3, 'Albañiles');
INSERT INTO `categorias` VALUES (4, 'Animadores');
INSERT INTO `categorias` VALUES (5, 'Arquitectos');
INSERT INTO `categorias` VALUES (6, 'Carpinteros');
INSERT INTO `categorias` VALUES (7, 'Constructores');
INSERT INTO `categorias` VALUES (8, 'Contadores');
INSERT INTO `categorias` VALUES (9, 'Corredores de seguro');
INSERT INTO `categorias` VALUES (10, 'Decoradores y Diseñadores de Interiores');
INSERT INTO `categorias` VALUES (11, 'Desarrolladores Web');
INSERT INTO `categorias` VALUES (12, 'Despachantes de aduana');
INSERT INTO `categorias` VALUES (13, 'Diseñadores gráficos');
INSERT INTO `categorias` VALUES (14, 'Economistas');
INSERT INTO `categorias` VALUES (15, 'Electricistas');
INSERT INTO `categorias` VALUES (16, 'Escribanos');
INSERT INTO `categorias` VALUES (17, 'Estilistas/Esteticistas');
INSERT INTO `categorias` VALUES (18, 'Fisioterapeutas');
INSERT INTO `categorias` VALUES (19, 'Fonoaudiólogos');
INSERT INTO `categorias` VALUES (20, 'Herreros');
INSERT INTO `categorias` VALUES (21, 'Ingenieros');
INSERT INTO `categorias` VALUES (22, 'Médicos');
INSERT INTO `categorias` VALUES (23, 'Nutricionistas');
INSERT INTO `categorias` VALUES (24, 'Odontólogos');
INSERT INTO `categorias` VALUES (25, 'Pintores');
INSERT INTO `categorias` VALUES (26, 'Podólogos');
INSERT INTO `categorias` VALUES (27, 'Psicólogos');
INSERT INTO `categorias` VALUES (28, 'Sanitarios');
INSERT INTO `categorias` VALUES (29, 'Tapiceros');
INSERT INTO `categorias` VALUES (30, 'Veterinarios');
INSERT INTO `categorias` VALUES (31, 'Vidrieros');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `departamentos`
-- 

CREATE TABLE IF NOT EXISTS `departamentos` (
  `idDepartamento` int(11) NOT NULL auto_increment,
  `nombreDepartamento` varchar(250) NOT NULL,
  PRIMARY KEY  (`idDepartamento`),
  UNIQUE KEY `nombreDepartamento` (`nombreDepartamento`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

-- 
-- Volcar la base de datos para la tabla `departamentos`
-- 

INSERT INTO `departamentos` VALUES (1, 'Montevideo');
INSERT INTO `departamentos` VALUES (2, 'Artigas');
INSERT INTO `departamentos` VALUES (3, 'Canelones');
INSERT INTO `departamentos` VALUES (4, 'Cerro Largo');
INSERT INTO `departamentos` VALUES (5, 'Colonia');
INSERT INTO `departamentos` VALUES (6, 'Durazno');
INSERT INTO `departamentos` VALUES (7, 'Flores');
INSERT INTO `departamentos` VALUES (8, 'Florida');
INSERT INTO `departamentos` VALUES (9, 'Lavalleja');
INSERT INTO `departamentos` VALUES (10, 'Maldonado');
INSERT INTO `departamentos` VALUES (11, 'Paysandú');
INSERT INTO `departamentos` VALUES (12, 'Río Negro');
INSERT INTO `departamentos` VALUES (13, 'Rivera');
INSERT INTO `departamentos` VALUES (14, 'Rocha');
INSERT INTO `departamentos` VALUES (15, 'Salto');
INSERT INTO `departamentos` VALUES (16, 'San José');
INSERT INTO `departamentos` VALUES (17, 'Soriano');
INSERT INTO `departamentos` VALUES (18, 'Tacuarembó');
INSERT INTO `departamentos` VALUES (19, 'Treinta y Tres');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `diasatencion`
-- 

CREATE TABLE IF NOT EXISTS `diasatencion` (
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
  PRIMARY KEY  (`iddiasAtencion`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- 
-- Volcar la base de datos para la tabla `diasatencion`
-- 

INSERT INTO `diasatencion` VALUES (1, 45, 1, 1, 1, 1, 1, 1, 1, '08:00:00', '18:00:00');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `formasdepago`
-- 

CREATE TABLE IF NOT EXISTS `formasdepago` (
  `idformasDePago` int(11) NOT NULL auto_increment,
  `idUser` int(11) NOT NULL,
  `contado` tinyint(1) NOT NULL,
  `debito` tinyint(1) NOT NULL,
  `credito` tinyint(1) NOT NULL,
  `otras` tinyint(1) NOT NULL,
  PRIMARY KEY  (`idformasDePago`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

-- 
-- Volcar la base de datos para la tabla `formasdepago`
-- 

INSERT INTO `formasdepago` VALUES (1, 20, 0, 0, 0, 0);
INSERT INTO `formasdepago` VALUES (2, 21, 1, 1, 1, 1);
INSERT INTO `formasdepago` VALUES (3, 22, 0, 0, 0, 0);
INSERT INTO `formasdepago` VALUES (4, 23, 0, 0, 0, 0);
INSERT INTO `formasdepago` VALUES (5, 24, 0, 0, 0, 0);
INSERT INTO `formasdepago` VALUES (6, 25, 0, 0, 0, 0);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `mapa`
-- 

CREATE TABLE IF NOT EXISTS `mapa` (
  `IdMapa` int(11) NOT NULL auto_increment,
  `IdUser` int(11) NOT NULL,
  `latitude` varchar(30) NOT NULL,
  `longitude` varchar(30) NOT NULL,
  PRIMARY KEY  (`IdMapa`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

-- 
-- Volcar la base de datos para la tabla `mapa`
-- 

INSERT INTO `mapa` VALUES (12, 10, '-34.89564642972746', '-56.16442680358887');
INSERT INTO `mapa` VALUES (11, 10, '-34.88226973385945', '-56.165971755981445');
INSERT INTO `mapa` VALUES (10, 10, '-34.88719824359768', '-56.13764762878418');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `users`
-- 

CREATE TABLE IF NOT EXISTS `users` (
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
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

-- 
-- Volcar la base de datos para la tabla `users`
-- 

INSERT INTO `users` VALUES (12, 'Alec', 'Ellis', 'alecellis1985@gmail.com', '26013794', '09865321', 'tajes 7530', '303030303', 2, 1, 'www.alec.com', 'logoJPG.jpg', 'https://www.facebook.com/alec.ellis.714', 'https://www.twitter.com', 'https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile', 'Brindo el mejor service que puedas ver en tu vida contratame ya!!!', 'afsaf', 'asfas', 'fasf', 'fasf', 'fasf', 'fasf', 'fasf', 'Palomo', '15efd829b89e9eb2287901e77c2aae1d');
INSERT INTO `users` VALUES (13, 'Sam', 'Gusto', 'elgroso@gmail.com', '26013794', '09865321', 'tajes 7530', '303030303', 2, 1, 'www.alec.com', 'logoJPG.jpg', 'https://www.facebook.com/alec.ellis.714', 'https://www.twitter.com', 'https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile', 'Por 3 mangos te doy clase las 24 horas, te llevo el carrito de panchos y todo lo que quieras a la hora que quieras. Se bailar y cantar pero no canto a', 'fasf', 'afsaf', 'asfas', 'fasf', 'fasf', 'fasf', 'fasf', 'El_Triste', 'pwpwpw');
INSERT INTO `users` VALUES (14, 'Tomy', 'Potatoue', 'los_pi@gmail.com', '26013794', '09865321', 'tajes 7530', '303030303', 2, 1, 'www.alec.com', 'logoJPG.jpg', 'https://www.facebook.com/alec.ellis.714', 'https://www.twitter.com', 'https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile', 'afsaf', 'afsaf', 'asfas', 'fasf', 'fasf', 'fasf', 'fasf', 'fasf', 'Gomon', 'pwpwpw');
INSERT INTO `users` VALUES (15, 'Charli', 'Gut', 'matoluzen@gmail.com', '26013794', '09865321', 'tajes 7530', '303030303', 2, 1, 'www.alec.com', 'logoJPG.jpg', 'https://www.facebook.com/alec.ellis.714', 'https://www.twitter.com', 'https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile', 'afsaf', 'afsaf', 'asfas', 'fasf', 'fasf', 'fasf', 'fasf', 'fasf', 'Alexander', 'pwpwpw');
INSERT INTO `users` VALUES (16, 'Juan', 'Gonzales', 'elgonchi@gmail.com', '262321651', '09861651', 'tucuman 2121', '6251651651', 2, 1, 'wawa.com.uy', 'logoJPG.jpg', 'https://www.facebook.com/alec.ellis.714', 'https://www.twitter.com', 'https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile', 'afsaf', 'asfa', 'fasfas', 'asfaf', 'fasf', 'fasf', 'fasf', 'fasf', 'El_Gonchi', 'ahfahf');
INSERT INTO `users` VALUES (17, 'Terry', 'Fierry', 'el_garca@gmail.com', '262321651', '09861651', 'tucuman 2121', '6251651651', 2, 1, 'wawa.com.uy', 'logoJPG.jpg', '', 'https://www.twitter.com', 'https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile', 'afsaf', 'asfa', 'fasfas', 'asfaf', 'fasf', 'fasf', 'fasf', 'fasf', 'El_Tierri', 'zukulu');
INSERT INTO `users` VALUES (18, 'BinAD', 'Ladennw', 'alecellis1985@gmail.com', '26013794', '098635923', 'Maximo tajen 3565', '26013794', 2, 1, '', '', '', '', '', 'qcpdEXwvoSTaqqSxKkBFQPSxrjJcLhpUgOoZFRKuOsOIpXzzuw', 'vxlvwXZOKZKLrUlcuusu', 'NXJPWGYJzUNZDACXkgDo', 'trSfWKgWkXIYJtLElBsA', 'LSyjbXeRmkYDwaCVIAsq', 'djYguRtulZwpstZDYzow', 'zMYvRrVKXzKAPWGrsxAJ', 'fasf', 'BspcijE', 'a8f5f167f44f4964e6c998dee827110c');
INSERT INTO `users` VALUES (19, 'Binkg', 'LadeneP', 'alecellis1985@gmail.com', '26013794', '098635923', 'Maximo tajen 3565', '26013794', 2, 2, '', '', '', '', 'https://www.linkedin.com/profile/view?id=172168721&trk=nav_responsive_tab_profile', 'iJvKNLEmUFpfARQGjWxPjQFhReYRPLeUTnyeHezyVDYboFClpO', 'gmhtcJLGGEBMlFBgRfVK', 'UQoQoMAlhQxoWVrCpAyI', 'qIBMfQfbGqpXbvXFqrKs', 'piKfAawYfRCuzdcTJOhK', 'XpXiUaAzxCCdyFlflNfW', 'larZYrIPksrMTDKXSLSD', 'fasf', 'AJFuihD', 'a8f5f167f44f4964e6c998dee827110c');
INSERT INTO `users` VALUES (20, 'BinWY', 'LadenMk', 'alecellis1985@gmail.com', '26013794', '098635923', 'Maximo tajen 3565', '26013794', 3, 2, '', '', '', '', '', '', '', '', '', '', '', '', '', 'ehNDzsb', 'a8f5f167f44f4964e6c998dee827110c');
INSERT INTO `users` VALUES (21, 'BinQa', 'LadenQw', 'alecellis1985@gmail.com', '26013794', '098635923', 'Maximo tajen 3565', '26013794', 2, 2, '', '', '', '', '', '', '', '', '', '', '', '', '', 'JmddKRN', 'a8f5f167f44f4964e6c998dee827110c');
INSERT INTO `users` VALUES (22, 'BinPL', 'LadenzG', 'alecellis1985@gmail.com', '26013794', '098635923', 'Maximo tajen 3565', '26013794', 2, 2, '', '', '', '', '', '', '', '', '', '', '', '', '', 'aIlkhYo', 'a8f5f167f44f4964e6c998dee827110c');
INSERT INTO `users` VALUES (23, 'BinWH', 'LadendD', 'alecellis1985@gmail.com', '26013794', '098635923', 'Maximo tajen 3565', '26013794', 2, 2, '', '', '', '', '', '', '', '', '', '', '', '', '', 'AypaNRD', 'a8f5f167f44f4964e6c998dee827110c');
INSERT INTO `users` VALUES (24, 'Bincw', 'LadentX', 'alecellis1985@gmail.com', '26013794', '098635923', 'Maximo tajen 3565', '26013794', 2, 2, '', '', '', '', '', '', '', '', '', '', '', '', '', 'sdPSmOi', 'a8f5f167f44f4964e6c998dee827110c');
INSERT INTO `users` VALUES (25, 'Bingd', 'LadenPf', 'alecellis1985@gmail.com', '26013794', '098635923', 'Maximo tajen 3565', '26013794', 2, 2, '', '', '', '', '', '', '', '', '', '', '', '', '', 'yAvwMxn', 'a8f5f167f44f4964e6c998dee827110c');
