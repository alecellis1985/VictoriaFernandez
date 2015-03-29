<?php
function registerUser() {
    $request = Slim::getInstance()->request();
    $user = json_decode($request->getBody());
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    $response = null;
    if ($conn->conectar()) {
        //$sql = "INSERT INTO users (nombre, apellido, email, telefono, celular, direccion, telefonoEmp, departamento, categoria, sitioWeb, imagen, enlace1, enlace2, descService, servicioOfrecido1, servicioOfrecido2, servicioOfrecido3,username,password) VALUES (:nombre, :apellido, :email, :telefono, :celular, :direccion, :telefonoEmp, :departamento, :categoria, :sitioWeb, :imagen, :enlace1, :enlace2, :descService, :servicioOfrecido1, :servicioOfrecido2, :servicioOfrecido3, :username, :password)";
        $sql = "INSERT INTO users (nombre, apellido, email, telefono, celular, direccion, telefonoEmp, departamento, categoria, sitioWeb, imagen, enlace1, enlace2, descService, servicioOfrecido1, servicioOfrecido2, servicioOfrecido3,username,password) VALUES (:nombre, :apellido, :email, :telefono, :celular, :direccion, :telefonoEmp, :departamento, :categoria, :sitioWeb, :imagen, :enlace1, :enlace2, :descService, :servicioOfrecido1, :servicioOfrecido2, :servicioOfrecido3, :username, :password)";
        $params = array();
        $params[0] = array("nombre",$user->nombre,"string",50);
        $params[1] = array("apellido",$user->apellido,"string",50);
        $params[2] = array("email",$user->email,"string",50);
        $params[3] = array("telefono",$user->telefono,"string",50);
        $params[4] = array("celular",$user->celular,"string",50);
        $params[5] = array("direccion",$user->direccion,"string",50);
        $params[6] = array("telefonoEmp",$user->telefonoEmp,"string",50);
        $params[7] = array("departamento",(int)$user->departamento,"int",5);
        $params[8] = array("categoria",(int)$user->categoria,"int",5);
        $params[9] = array("sitioWeb",$user->sitioWeb,"string",50);
        $params[10] = array("imagen",$user->imagen,"string",50);
        $params[11] = array("enlace1",$user->enlace1,"string",250);
        $params[12] = array("enlace2",$user->enlace2,"string",250);
        $params[13] = array("descService",$user->descService,"string",1000);
        $params[14] = array("servicioOfrecido1",$user->servicioOfrecido1,"string",250);
        $params[15] = array("servicioOfrecido2",$user->servicioOfrecido2,"string",250);
        $params[16] = array("servicioOfrecido3",$user->servicioOfrecido3,"string",250);
        $params[17] = array("username",$user->username,"string",50);
        $params[18] = array("password",$user->password,"string",10);

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

