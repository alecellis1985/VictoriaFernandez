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
            echo MessageHandler::getErrorResponse("Internet connection error, please reload the page.");
        }
    } else {
        echo MessageHandler::getErrorResponse("Internet connection error, please reload the page.");
    }
}

function getArrayFromRequest($request) {
    return array(
        "nombre" => is_null($request->post('nombre')) ? "" : $request->post('nombre'),
        "apellido" => is_null($request->post('apellido')) ? "" : $request->post('apellido'),
        "email" => is_null($request->post('email')) ? "" : $request->post('email'),
        "telefono" => is_null($request->post('telefono')) ? "" : $request->post('telefono'),
        "celular" => is_null($request->post('celular')) ? "" : $request->post('celular'),
        "direccion" => is_null($request->post('direccion')) ? "" : $request->post('direccion'),
        "telefonoEmp" => is_null($request->post('telefonoEmp')) ? "" : $request->post('telefonoEmp'),
        "departamento" => is_null($request->post('departamento')) ? "" : $request->post('departamento'),
        "categoria" => 0, //$_POST['categoria'],
        "sitioWeb" => is_null($request->post('sitioWeb')) ? "" : $request->post('sitioWeb'),
        //"imagen" => $request->post('imagen'),
        "facebookUrl" => is_null($request->post('facebookUrl')) ? "" : $request->post('facebookUrl'),
        "twitterUrl" => is_null($request->post('twitterUrl')) ? "" : $request->post('twitterUrl'),
        "linkedinUrl" => is_null($request->post('linkedinUrl')) ? "" : $request->post('linkedinUrl'),
        "descService" => is_null($request->post('descService')) ? "" : $request->post('descService'),
        "servicioOfrecido1" => is_null($request->post('servicioOfrecido1')) ? "" : $request->post('servicioOfrecido1'),
        "servicioOfrecido2" => is_null($request->post('servicioOfrecido2')) ? "" : $request->post('servicioOfrecido2'),
        "servicioOfrecido3" => is_null($request->post('servicioOfrecido3')) ? "" : $request->post('servicioOfrecido3'),
        "username" => is_null($request->post('username')) ? "" : $request->post('username'),
        "password" => is_null($request->post('password')) ? "" : $request->post('password')
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
    $fileSize = $_FILES['file']['size'];

    if ($fileSize > 2000000)
        return false;

    return true;
}

function insertNewUser($conn, $user) {
    $response = null;
    if ($conn->conectar()) {
        $sql = "INSERT INTO users (nombre, apellido, email, telefono, celular, direccion, telefonoEmp, "
                . "departamento, categoria, sitioWeb, imagenUrl, facebookUrl, twitterUrl, linkedinUrl, descService, servicioOfrecido1,"
                . " servicioOfrecido2, servicioOfrecido3,username,password) "
                . "VALUES (:nombre, :apellido, :email, :telefono, :celular, :direccion, :telefonoEmp, :departamento,"
                . " :categoria, :sitioWeb, :imagenUrl, :facebookUrl, :twitterUrl, :linkedinUrl, :descService, :servicioOfrecido1,"
                . " :servicioOfrecido2, :servicioOfrecido3, :username, :password)";
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
        $params[14] = array("descService", $user['descService'], "string", 1000);
        $params[15] = array("servicioOfrecido1", $user['servicioOfrecido1'], "string", 250);
        $params[16] = array("servicioOfrecido2", $user['servicioOfrecido2'], "string", 250);
        $params[17] = array("servicioOfrecido3", $user['servicioOfrecido3'], "string", 250);
        $params[18] = array("username", $user['username'], "string", 50);
        $params[19] = array("password", md5($user['password']), "string", 10);

        if ($conn->consulta($sql, $params)) {
            $user['id'] = $conn->ultimoIdInsert();
            $response = MessageHandler::getSuccessResponse("Se registro exitosamente!", $user);
        } else {
            $response = MessageHandler::getErrorResponse("Internet connection error, please reload the page.");
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
