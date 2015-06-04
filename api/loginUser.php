<?php

function loginUser() {
    $request = Slim::getInstance()->request();
    $userLogin = json_decode($request->getBody());
    //$userLogin = getUserArrayFromRequest($request);
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);

    echo logUser($conn, $userLogin);
}

function logUser($conn, $userLogin) {
    $response = null;
    if ($conn->conectar()) {
        $sql = "SELECT * FROM users WHERE username = :username and password = :password";
        $params = array();
        $params[0] = array("username", $userLogin->username, "string");
        $params[1] = array("password", md5($userLogin->password), "string");

        if ($conn->consulta($sql, $params)) {
            $user = $conn->siguienteRegistro();
            //$user = $users[0];
            if ($user && isset($user->username)) {
                $_SESSION['ingreso'] = true;
                $_SESSION['usuario'] = $user->username;
                $_SESSION['password'] = $user->password;
                //TODO: Agregar campo isAdmin para el administrador
                $_SESSION['isAdmin'] = false;
                setcookie('usuario', $user->username);
                $error = false;
            } else {
                $_SESSION['ingreso'] = false;
                $error = true;
            }

            if (!$error) {
                $response = MessageHandler::getSuccessResponse("Successfully logged in!", $user);
            } else {
                $response = MessageHandler::getErrorResponse("Error in login, wrong user and/or password");
            }
        } else {
            echo MessageHandler::getErrorResponse("Primer consulta error.");
        }
    }
    if ($response == null) {
        header('HTTP/1.1 400 Bad Request');
        return MessageHandler::getDBErrorResponse();
    } else {
        $conn->desconectar();
        return $response;
    }
}

function getUserArrayFromRequest($request) {
    return array(
        "username" => is_null($request->post('username')) ? "" : $request->post('username'),
        "password" => is_null($request->post('password')) ? "" : $request->post('password')
    );
}

function logoutUser() {
    $response = null;
    
    $_SESSION['ingreso'] = false;
    $_SESSION['isAdmin'] = false;
    unset($_SESSION['usuario']);
    unset($_SESSION['password']);
    
    if (isset($_COOKIE['usuario'])) {
        unset($_COOKIE['usuario']);
    }
    if (!isset($_COOKIE['usuario']) && !isset($_SESSION['usuario'])) {
        $response = MessageHandler::getSuccessResponse("Successfully logged in!", null);
    } else {
        $response = MessageHandler::getErrorResponse("Error in logout, try again later");
    }
    
    return $response;
}
