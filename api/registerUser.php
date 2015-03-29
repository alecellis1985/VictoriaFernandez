<?php
function registerUser() {
    $request = Slim::getInstance()->request();
    $user = json_decode($request->getBody());
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    $response = null;
    if ($conn->conectar()) {
        $sql = "INSERT INTO users (nombre, apellido, email, telefono, celular, direccion, telefonoEmp, departamento, categoria, sitioWeb, imagen, enlace1, enlace2, descService, servicioOfrecido1, servicioOfrecido2, servicioOfrecido3,username,password) VALUES (:nombre, :apellido, :email, :telefono, :celular, :direccion, :telefonoEmp, :departamento, :categoria, :sitioWeb, :imagen, :enlace1, :enlace2, :descService, :servicioOfrecido1, :servicioOfrecido2, :servicioOfrecido3, :username, :password)";
        $params = array();
        $params[0] = array("nombre",$user->nombre,"STRING",50);
        $params[1] = array("apellido",$user->apellido,"STRING",50);
        $params[2] = array("email",$user->email,"STRING",50);
        $params[3] = array("telefono",$user->telefono,"STRING",50);
        $params[4] = array("celular",$user->celular,"STRING",50);
        $params[5] = array("direccion",$user->direccion,"STRING",50);
        $params[6] = array("telefonoEmp",$user->telefonoEmp,"STRING",50);
        $params[7] = array("departamento",$user->departamento,"INT");
        $params[8] = array("categoria",$user->categoria,"INT");
        $params[9] = array("sitioWeb",$user->sitioWeb,"STRING",50);
        $params[10] = array("imagen",$user->imagen,"STRING",50);
        $params[11] = array("enlace1",$user->enlace1,"STRING",250);
        $params[12] = array("enlace2",$user->enlace2,"STRING",250);
        $params[13] = array("descService",$user->descService,"STRING",1000);
        $params[14] = array("servicioOfrecido1",$user->servicioOfrecido1,"STRING",250);
        $params[15] = array("servicioOfrecido2",$user->servicioOfrecido2,"STRING",250);
        $params[16] = array("servicioOfrecido3",$user->servicioOfrecido3,"STRING",250);
        $params[17] = array("username",$user->username,"STRING",50);
        $params[18] = array("servicioOfrecido1",$user->servicioOfrecido1,"STRING",50);
        $params[19] = array("password",$user->password,"STRING",10);
        
        if ($conn->consulta($sql, $params)) {
            $user->id = $conn->ultimoIdInsert();
            $response = MessageHandler::getSuccessResponse("",$user);
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

