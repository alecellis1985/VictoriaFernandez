<?php
function getUsers($categoria,$departamento) {
    
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    $response = null;
    if ($conn->conectar()) {
        $sql = "select * FROM users WHERE categoria = :categoria and departamento = :departamento ORDER BY nombre";
        //$sql = "SELECT u.*, m.* FROM users u, mapa m WHERE u.idUser = m.IdUser and u.categoria = :categoria and u.departamento = :departamento GROUP BY u.idUser ORDER BY u.nombre ";
        //$sql = "SELECT u.*, (SELECT * FROM mapa m WHERE u.idUser = m.IdUser) AS Locations, FROM users u WHERE u.categoria = :categoria and u.departamento = :departamento ORDER BY u.nombre";
                
        $params = array();
        $params[0] = array("departamento",(int)$departamento,"int",5);
        $params[1] = array("categoria",(int)$categoria,"int",5);
        if ($conn->consulta($sql, $params)) {
            $users = $conn->restantesRegistros();
            $response = MessageHandler::getSuccessResponse("",$users);
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

