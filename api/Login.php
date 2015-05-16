<?php
function login(){
    $request = Slim::getInstance()->request();
    $requestData = json_decode($request->getBody());
    session_start();
    $usuario = $_POST['username'];
    $password = $_POST['password'];
    if (!isset($usuario) && !isset($password)) {
        echo MessageHandler::getErrorResponse("Username and/or password are required");
    } else {
        $response = null;
        $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
        if ($conn->conectar()) {
            $sql = $sql = "SELECT * FROM users WHERE userName = :userName and password = :password";
            $params = array();
            $params[0] = array("userName", $usuario, "STRING");
            $params[1] = array("password", md5($password), "STRING");
            if ($conn->consulta($sql, $params)) {
                $users = $conn->restantesRegistros();
                $user = $users[0];
                if (isset($user['userName'])) {
                    $_SESSION['ingreso'] = true;
                    $_SESSION['usuario'] = $user['userName'];
                    $_SESSION['password'] = $user['password'];
                    setcookie('usuario', $user['userName']);
                    $response = MessageHandler::getSuccessResponse("", null);
                } else {
                    $_SESSION['ingreso'] = false;
                    $response = MessageHandler::getErrorResponse("Wrong user or password. Try again");
                }
            } else {
                $response = MessageHandler::getErrorResponse("Internet connection error, please reload the page.");
            }
        }
        if ($response == null) {
            header('HTTP/1.1 400 Bad Request');
            echo MessageHandler::getDBErrorResponse();
        } else {
            $conn->desconectar();
            echo $response;
        }
    }
}