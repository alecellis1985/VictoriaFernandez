<?php

function getUsers($categoria, $departamento) {

    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    $response = null;
    if ($conn->conectar()) {
        $sql = "select * FROM users WHERE categoria = :categoria and departamento = :departamento ORDER BY nombre";
        $params = array();
        $params[0] = array("departamento", (int) $departamento, "int", 5);
        $params[1] = array("categoria", (int) $categoria, "int", 5);
        if ($conn->consulta($sql, $params)) {
            $users = $conn->restantesRegistros();

//            $sqlMaps = "SELECT m.* FROM maps m WHERE m.IdUser in (";
//            var_dump($users[0]->IdUser);
//            for($i=0;$i<count($users);$i++)
//            {
//                
//                $sqlMaps = $sqlMaps . $users[$i];
//            }
//            $sqlMaps = $sqlMaps . ')';
//            if($conn->consulta($sqlMaps))
//            {
//                $sqlret = $conn->restantesRegistros();
//            }
//            
//            $response = MessageHandler::getSuccessResponse("",$sqlret);
            $response = MessageHandler::getSuccessResponse("", $users);
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

function getAllUsers() {
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    $response = null;
    if ($conn->conectar()) {
        $sql = "select * FROM users ORDER BY nombre";
        if ($conn->consulta($sql)) {
            $users = $conn->restantesRegistros();
            $response = MessageHandler::getSuccessResponse("", $users);
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

function getLoggedUser() {
    if (array_key_exists("usuario", $_SESSION)) {
        $user = $_SESSION['usuario'];
        $isAdmin = $_SESSION['isAdmin'];

        if ($_SESSION['ingreso'] && isset($user)) {
            $result = array("success" => true, "user" => $user, "isAdmin" => $isAdmin);
            echo json_encode($result);
        } else {
            $result = array("success" => false);
            echo json_encode($result);
        }
    } else {
        $result = array("success" => false);
        echo json_encode($result);
    }
}
