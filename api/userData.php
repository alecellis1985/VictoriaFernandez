<?php

function updateVisits() {
    $response = null;
    $request = Slim::getInstance()->request();
    $user = json_decode($request->getBody());
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    $updateVisitas = "UPDATE useres u SET visitas = visitas +1 where u.idUser = :idUser";
    $params = array();
    $params[0] = array("idUser", $user->idUser, "int");
    $error = false;
    if ($conn->conectar()) {
        try {
            $conn->beginTransaction();
            if ($conn->consulta($updateVisitas,$params)) {
                $conn->commitTransaction();
            } 
        } catch (Exception $exc) {
            $conn->rollbackTransaction();
        }
    }
    $conn->desconectar();
    echo $response;
}

