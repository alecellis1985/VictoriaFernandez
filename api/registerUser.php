<?php

function registerUser() {
    $request = Slim::getInstance()->request();

    $user = getArrayFromRequest($request);
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);

    //Save File
    //TODO: Validate format and size
    if (validateFileToUpload()) {
        $filenameAndExt = explode(".", $_FILES['file']['name']);
        $destination = '../uploaded/' . md5($filenameAndExt[0]) . "_" . md5($user['username']) . "." . $filenameAndExt[1];
        if (move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
            $user['imagenUrl'] = md5($filenameAndExt[0]) . "_" . md5($user['username']) . "." . $filenameAndExt[1];
            echo insertNewUser($conn, $user);
        } else {
            echo MessageHandler::getErrorResponse("Img error.");
        }
    } else {
        $user['imagenUrl'] = '';
        echo insertNewUser($conn, $user);
    }
}

function insertNewUser($conn, $user) {
    $response = null;
    if ($conn->conectar()) {
        $sql = "INSERT INTO users (nombre, apellido, email, telefono, celular, direccion, telefonoEmp, "
                . "departamento, categoria, sitioWeb, imagenUrl, facebookUrl, twitterUrl, linkedinUrl, descService, servicioOfrecido1,"
                . " servicioOfrecido2, servicioOfrecido3, servicioOfrecido4, servicioOfrecido5, servicioOfrecido6, descServiceLong, username, password) "
                . "VALUES (:nombre, :apellido, :email, :telefono, :celular, :direccion, :telefonoEmp, :departamento,"
                . " :categoria, :sitioWeb, :imagenUrl, :facebookUrl, :twitterUrl, :linkedinUrl, :descService, :servicioOfrecido1,"
                . " :servicioOfrecido2, :servicioOfrecido3, :servicioOfrecido4, :servicioOfrecido5, :servicioOfrecido6,:descServiceLong, :username, :password)";
        $params = array();
        $params[0] = array("nombre", $user['nombre'], "string", 50);
        $params[1] = array("apellido", $user['apellido'], "string", 50);
        $params[2] = array("email", $user['email'], "string", 50);
        $params[3] = array("telefono", $user['telefono'], "string", 50);
        $params[4] = array("celular", $user['celular'], "string", 50);
        $params[5] = array("direccion", $user['direccion'], "string", 50);
        $params[6] = array("telefonoEmp", $user['telefonoEmp'], "string", 50);
        $params[7] = array("departamento", (int) $user['departamento'], "int", 5);
        $params[8] = array("categoria", (int) $user['categoria'], "int", 5);
        $params[9] = array("sitioWeb", $user['sitioWeb'], "string", 50);
        $params[10] = array("imagenUrl", $user['imagenUrl'], "string", 100);
        $params[11] = array("facebookUrl", $user['facebookUrl'], "string", 250);
        $params[12] = array("twitterUrl", $user['twitterUrl'], "string", 250);
        $params[13] = array("linkedinUrl", $user['linkedinUrl'], "string", 250);
        $params[14] = array("descService", $user['descService'], "string", 150);
        $params[15] = array("servicioOfrecido1", $user['servicioOfrecido1'], "string", 20);
        $params[16] = array("servicioOfrecido2", $user['servicioOfrecido2'], "string", 20);
        $params[17] = array("servicioOfrecido3", $user['servicioOfrecido3'], "string", 20);
        $params[18] = array("servicioOfrecido4", $user['servicioOfrecido4'], "string", 20);
        $params[19] = array("servicioOfrecido5", $user['servicioOfrecido5'], "string", 20);
        $params[20] = array("servicioOfrecido6", $user['servicioOfrecido6'], "string", 20);
        $params[21] = array("descServiceLong", $user['descServiceLong'], "string", 1000);
        $params[22] = array("username", $user['username'], "string", 50);
        $params[23] = array("password", md5($user['password']), "string", 10);

        if ($conn->consulta($sql, $params)) {
            $user['id'] = $conn->ultimoIdInsert();

            $error = false;
            $userMarkers = json_decode($user['markers']);
            $sqlMap = "INSERT INTO mapa VALUES (NULL, " . $user['id'] . ", :latitude, :longitude) ";
            for ($i = 0; $i < count($userMarkers); $i++) {
                $paramsInsertMap = array();
                $latitude = $userMarkers[$i]->latitude;
                $longitude = $userMarkers[$i]->longitude;
                $paramsInsertMap[0] = array("latitude", $latitude, "string", 30);
                $paramsInsertMap[1] = array("longitude", $longitude, "string", 30);
                if ($conn->consulta($sqlMap, $paramsInsertMap)) {
                    
                } else {
                    //tirar error
                    $error = true;
                }
            }
            if (!$error) {
                $sqlPagos = "INSERT INTO `formasdepago` (`idUser`,`contado`,`debito`,`credito`,`otras`) 
                                VALUES(:idUser , :contado , :debito, :credito, :otras)";
                $paramsPagos = array();
                $paramsPagos[0] = array("idUser", $user['id'], "int",11);
                $paramsPagos[1] = array("contado", $user['formaDePago']['contado'], "int",1);
                $paramsPagos[2] = array("debito", $user['formaDePago']['contado'], "int",1);
                $paramsPagos[3] = array("credito", $user['formaDePago']['contado'], "int",1);
                $paramsPagos[4] = array("otras", $user['formaDePago']['contado'], "int",1);

                if ($conn->consulta($sqlPagos, $paramsPagos)) {
                    $sqlDias = "INSERT INTO `diasatencion`(`idUser`,`lunes`,`martes`,`miercoles`,`jueves`,`viernes`,`sabado`,`domingo`, `horaComienzo`, `horaFin`) 
                                    VALUES (:idUser, :lunes, :martes, :miercoles, :jueves, :viernes, :sabado, :domingo, :horaComienzo, :horaFin)";
                    $paramsDias = array();
                    $paramsDias[0] = array("idUser", $user['id'], "int",11);
                    $paramsDias[1] = array("lunes", $user['diasAtencion']['lunes'], "int",1);
                    $paramsDias[2] = array("martes", $user['diasAtencion']['martes'], "int",1);
                    $paramsDias[3] = array("miercoles", $user['diasAtencion']['miercoles'], "int",1);
                    $paramsDias[4] = array("jueves", $user['diasAtencion']['jueves'], "int",1);
                    $paramsDias[5] = array("viernes", $user['diasAtencion']['viernes'], "int",1);
                    $paramsDias[6] = array("sabado", $user['diasAtencion']['sabado'], "int",1);
                    $paramsDias[7] = array("domingo", $user['diasAtencion']['domingo'], "int",1);
                    $paramsDias[8] = array("horaComienzo", $user['horaComienzo'], "string", 20);
                    $paramsDias[9] = array("horaFin", $user['horaFin'], "string", 20);

                    if ($conn->consulta($sqlDias, $paramsDias)) {
                        
                    } else {
                        
                    }
                } else {
                    //tirar error
                    $error = true;
                }
            }

            if (!$error) {
                $response = MessageHandler::getSuccessResponse("Se registro exitosamente!", $user);
            } else {
                $response = MessageHandler::getErrorResponse("Mi puto error.");
            }
        } else {
            //$response = MessageHandler::getErrorResponse("Internet connection error, please reload the page.");
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

function getArrayFromRequest($request) {
    $diasAtencion = json_decode($request->post("diasAtencion"));
    // var_dump($diasAtencion);
    $formaDePago = json_decode($request->post("formaDePago"));
    return array(
        "nombre" => is_null($request->post('nombre')) ? "" : $request->post('nombre'),
        "apellido" => is_null($request->post('apellido')) ? "" : $request->post('apellido'),
        "email" => is_null($request->post('email')) ? "" : $request->post('email'),
        "telefono" => is_null($request->post('telefono')) ? "" : $request->post('telefono'),
        "celular" => is_null($request->post('celular')) ? "" : $request->post('celular'),
        "direccion" => is_null($request->post('direccion')) ? "" : $request->post('direccion'),
        "telefonoEmp" => is_null($request->post('telefonoEmp')) ? "" : $request->post('telefonoEmp'),
        "departamento" => is_null($request->post('departamento')) ? "" : $request->post('departamento'),
        "categoria" => is_null($request->post('categoria')) ? "" : $request->post('categoria'),
        "sitioWeb" => is_null($request->post('sitioWeb')) ? "" : $request->post('sitioWeb'),
        "facebookUrl" => is_null($request->post('facebookUrl')) ? "" : $request->post('facebookUrl'),
        "twitterUrl" => is_null($request->post('twitterUrl')) ? "" : $request->post('twitterUrl'),
        "linkedinUrl" => is_null($request->post('linkedinUrl')) ? "" : $request->post('linkedinUrl'),
        "descService" => is_null($request->post('descService')) ? "" : $request->post('descService'),
        "servicioOfrecido1" => is_null($request->post('servicioOfrecido1')) ? "" : $request->post('servicioOfrecido1'),
        "servicioOfrecido2" => is_null($request->post('servicioOfrecido2')) ? "" : $request->post('servicioOfrecido2'),
        "servicioOfrecido3" => is_null($request->post('servicioOfrecido3')) ? "" : $request->post('servicioOfrecido3'),
        "servicioOfrecido4" => is_null($request->post('servicioOfrecido4')) ? "" : $request->post('servicioOfrecido4'),
        "servicioOfrecido5" => is_null($request->post('servicioOfrecido5')) ? "" : $request->post('servicioOfrecido5'),
        "servicioOfrecido6" => is_null($request->post('servicioOfrecido6')) ? "" : $request->post('servicioOfrecido6'),
        "diasAtencion" => array(
            "lunes" => $diasAtencion->lunes ? 1 : 0,
            "martes" => $diasAtencion->martes ? 1 : 0,
            "miercoles" => $diasAtencion->miercoles ? 1 : 0,
            "jueves" => $diasAtencion->jueves ? 1 : 0,
            "viernes" => $diasAtencion->viernes ? 1 : 0,
            "sabado" => $diasAtencion->sabado ? 1 : 0,
            "domingo" => $diasAtencion->domingo ? 1 : 0,
        ),
        "formaDePago" => array(
            "contado" => $formaDePago->contado ? 1 : 0,
            "credito" => $formaDePago->credito ? 1 : 0,
            "debito" => $formaDePago->debito ? 1 : 0,
            "otras" => $formaDePago->otras ? 1 : 0,
        ),
        "descServiceLong" => is_null($request->post('descServiceLong')) ? "" : $request->post('descServiceLong'),
        "username" => is_null($request->post('username')) ? "" : $request->post('username'),
        "password" => is_null($request->post('password')) ? "" : $request->post('password'),
        "markers" => $request->post('markers'),
        "horaComienzo" => is_null($request->post('horaComienzo')) ? "" : $request->post('horaComienzo'),
        "horaFin" => is_null($request->post('horaFin')) ? "" : $request->post('horaFin')
    );
}

function checkUsername() {
    $request = Slim::getInstance()->request();

    $userName = json_decode($request->getBody())->userName;
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    $response = null;
    if ($conn->conectar()) {
        $sql = "SELECT 1 FROM users WHERE username = :userName";
        $params = array();
        $params[0] = array("userName", $userName, "string", 50);

        if ($conn->consulta($sql, $params)) {
            if ($conn->cantidadRegistros() == 0)
                $response = MessageHandler::getSuccessResponse("Consulta exitosa", array("isUnique" => true));
            else
                $response = MessageHandler::getSuccessResponse("Consulta exitosa", array("isUnique" => false));
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

function validateFileToUpload() {
    if (!isset($_FILES['file']))
        return false;
    $fileSize = $_FILES['file']['size'];

    if ($fileSize > 2000000)
        return false;

    return true;
}
