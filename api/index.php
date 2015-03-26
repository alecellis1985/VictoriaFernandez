<?php

require 'Slim/Slim.php';
require_once("Slim/includes/class.Conexion.BD.php");
require_once("Slim/config/parametros.php");
require_once("Slim/includes/MessageHandler.php");
require_once 'usersList.php';
require_once 'crudUser.php';

$app = new Slim();
$app->get('/users', 'getUsers');
$app->get('/users/:id', 'getUser');
$app->post('/add_user', 'addUser');
$app->put('/users/:id', 'updateUser');
$app->delete('/users/:id', 'deleteUser');


$app->run();

function getConnection() {
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "oso2203";
    $dbname = "angular_tutorial";
    $dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}
