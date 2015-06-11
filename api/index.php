<?php

require 'Slim/Slim.php';

require_once("Slim/includes/class.Conexion.BD.php");
require_once("Slim/config/parametros.php");
require_once("Slim/includes/MessageHandler.php");
//require_once 'usersList.php';
require_once 'crudUser.php';
require_once 'crudDepartamentos.php';
require_once 'crudBarrios.php';
require_once 'crudCategorias.php';
require_once 'registerUser.php';
require_once 'loginUser.php';
require_once 'getUsers.php';
require_once 'mailHandler.php';
require_once 'planes.php';

session_cache_limiter(false);
session_start();
//$_SESSION['ingreso'] = false;
//$_SESSION['usuario'] = '';
//$_SESSION['password'] = '';
//$_SESSION['isAdmin'] = false;
$app = new Slim();

//SESSION
//$app->add(new SessionCookie(array('secret' => 'myappsecret')));

$app->get('/users', 'getAllUsers');
//$app->get('/users/:id', 'getUser');
$app->get('/users/loggedUser', 'isUserLogged');
//$app->post('/add_user', 'addUser');
//$app->put('/users/:id', 'updateUser');
//$app->delete('/users/:id', 'deleteUser');
$app->post('/sendMail', 'sendEmail');
$app->get('/userPlans', 'getPlanes');
$app->get('/departamentos', 'getDepartamentos');
$app->get('/categorias', 'getCategorias');
$app->get('/barrios', 'getBarrios');
$app->post('/login-user', 'loginUser');
$app->post('/logout-user', 'logoutUser');
$app->get('/users/:categoria/:departamento', 'getUsers');
$app->post('/agregar_usuario', 'registerUser');
$app->post('/editar_usuario', 'editUser');
$app->post('/check-username', 'checkUsername');
$app->get('/getCurrentUser', 'getLoggedUser');
$app->post('/editar_img', 'editImg');

$app->run();

//function getConnection() {
//    $dbhost = "localhost";
//    $dbuser = "root";
//    $dbpass = "oso2203";
//    $dbname = "angular_tutorial";
//    $dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
//    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//    return $dbConnection;
//}
