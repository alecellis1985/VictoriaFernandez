<?php

//THIS function is called from the main search page
function getUsers($categoria, $departamento, $nombreProf = null) {
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    $response = null;

    /*if ($nombreProf === "null") {
        $nombreProf = "";
    }*/
    
    $addNombreProfToQuery = "";
    if (isset($nombreProf) && $nombreProf != '') {
        // variable set, not empty string, not falsy
        $nombreProf = mysql_real_escape_string($nombreProf);        
        //$addNombreProfToQuery = "concat_ws(' ',u.nombre,u.apellido) like '%".$nombreProf."%' and "; 
        $addNombreProfToQuery = "concat_ws(' ',u.nombre,u.apellido) like concat('%', :nombreProf, '%') and ";        
    }

    if ($conn->conectar()) {

        $sql = "SELECT u.idUser,u.nombre,u.apellido,u.email,u.telefono,u.celular,u.direccion,u.telefonoEmp," .
                "u.departamento,u.categoria,u.barrio,u.sitioWeb,u.imagenUrl,u.facebookUrl,u.twitterUrl," .
                "u.linkedinUrl,u.descService,u.servicioOfrecido1,u.servicioOfrecido2,u.servicioOfrecido3," .
                "u.servicioOfrecido4,u.servicioOfrecido5,u.servicioOfrecido6,u.descServiceLong," .
                "m.*,fp.*,da.* FROM " .
                "users u left join mapa m on u.idUser = m.IdUser " .
                "left join formasdepago fp on u.idUser = fp.idUser " .
                "left join diasatencion da on u.idUser = da.idUser " .
                "WHERE " . $addNombreProfToQuery .
                " (categoria = :categoria OR :categoria = -1) and " .
                "(departamento = :departamento OR :departamento = -1) " .
                " and IsAdmin = 0 and IsActive = 1 ORDER BY nombre";
        //var_dump($sql);
        //die();

        $params = array();
        $params[0] = array("departamento", (int) $departamento, "int", 5);
        $params[1] = array("categoria", (int) $categoria, "int", 5);
        if (isset($nombreProf) && $nombreProf != '') {
            // variable set, not empty string, not falsy
            $params[2] = array("nombreProf", $nombreProf, "string", 25);
        }
        if ($conn->consulta($sql, $params)) {
            $users = $conn->restantesRegistros();


            $response = MessageHandler::getSuccessResponse("", $users);
        } else {
            $response = MessageHandler::getErrorResponse("Internet connection error, please reload the page.");
        }
    }
    //}
    if ($response == null) {
        header('HTTP/1.1 400 Bad Request');
        echo MessageHandler::getDBErrorResponse();
    } else {
        $conn->desconectar();
        echo $response;
    }
}

//Function to get users 
function getAllUsers() {
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    $response = null;
    if ($conn->conectar()) {
        $sql = "SELECT * FROM users where IsAdmin = 0 ORDER BY nombre";
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

function isUserLogged() {
    if (array_key_exists("usuario", $_SESSION)) {
        $user = $_SESSION['usuario'];
        $isAdmin = $_SESSION['IsAdmin'];

        if ($_SESSION['ingreso'] && isset($user)) {
            $result = array("success" => true, "user" => $user, "IsAdmin" => $isAdmin);
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

function getLoggedUser() {
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    $response = null;
    if ($conn->conectar()) {
        $sql = "select * FROM users WHERE username = :username";
        $params = array();
        $params[0] = array("username", $_SESSION['usuario'], "string", 100);
        if ($conn->consulta($sql, $params)) {
            $users = $conn->restantesRegistros();
            $currentUser = $users[0];
            $userData['user'] = $currentUser;
            $_SESSION['IsAdmin'] = $currentUser->IsAdmin == 1;
            $currentUser->IsAdmin = $currentUser->IsAdmin == 1;
            $sqlFormasDePago = "select * from formasdepago where idUser = :userId";
            $paramsFormasDePago = array();
            $paramsFormasDePago[0] = array("userId", $currentUser->idUser, "int", 11);
            if ($conn->consulta($sqlFormasDePago, $paramsFormasDePago)) {
                $formasDePago = $conn->restantesRegistros();
                $formaDePagoUser = $formasDePago[0];
                $userData['formasDePago'] = $formaDePagoUser;

                $sqlDiasAtencion = "select * from diasatencion where idUser = :userId";
                $paramsDiasAtencion = array();
                $paramsDiasAtencion[0] = array("userId", $currentUser->idUser, "int", 11);
                if ($conn->consulta($sqlDiasAtencion, $paramsDiasAtencion)) {
                    $diasAtencion = $conn->restantesRegistros();
                    $diasAtencionUser = $diasAtencion[0];
                    $userData['diasAtencion'] = $diasAtencionUser;

                    $sqlMarkers = "select * from mapa where IdUser = :userId";
                    $paramsMarkers = array();
                    $paramsMarkers[0] = array("userId", $currentUser->idUser, "int", 11);

                    if ($conn->consulta($sqlMarkers, $paramsMarkers)) {
                        $markers = $conn->restantesRegistros();
                        $userData['markers'] = getMarkersFormat($markers);

                        $response = MessageHandler::getSuccessResponse("", $userData);
                    } else {
                        $response = MessageHandler::getErrorResponse("Error con la consulta!");
                    }
                } else {
                    $response = MessageHandler::getErrorResponse("Error con la consulta!");
                }
            } else {
                $response = MessageHandler::getErrorResponse("Error con la consulta!");
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

function getMarkersFormat($markers) {
    $result = array();
    foreach ($markers as $marker) {
        $newMarker = array("lat" => $marker->latitude, "long" => $marker->longitude);
        array_push($result, $newMarker);
    }

    return $result;
}

function isCurrentUserAdmin() {
    $response = MessageHandler::getSuccessResponse("Success", Array('isAdmin' => $_SESSION['IsAdmin']));
    echo $response;
}
