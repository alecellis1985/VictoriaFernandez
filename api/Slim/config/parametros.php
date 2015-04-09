<?php
if ($_SERVER['SERVER_NAME'] != "localhost") {
    define("CANTPAG", 8);
    define("CANTPAGCOMMENTS", 5);
    define("DRIVER", "mysql");
    define("SERVIDOR", "sql202.260mb.net");
    define("BASE", "n260m_16036897_profesionalesDB");
    define("USUARIO", "n260m_16036897");
    define("CLAVE", "croto10");
}else{
    define("CANTPAG", 8);
    define("CANTPAGCOMMENTS", 5);
    define("DRIVER", "mysql");
    define("SERVIDOR", "localhost");
    define("BASE", "angular_tutorial");
    define("USUARIO", "root");
    define("CLAVE", "turtleman1");
    //define("CLAVE", "oso2203");
}
