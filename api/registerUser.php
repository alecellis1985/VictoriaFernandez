<?php

function editUserPwd() {
    $request = Slim::getInstance()->request();
    $userPwd = json_decode($request->getBody());
    if (md5($userPwd->oldPwd) == $_SESSION['password']) {
        $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
        $userPwdA = array();
        $userPwdA["oldPwd"] = $userPwd->oldPwd;
        $userPwdA["newPwd"] = $userPwd->newPwd;
        echo updateUserPwd($conn, $userPwdA);
    } else {
        echo MessageHandler::getErrorResponse("La contraseña actual no es correcta");
    }
}

function updateUserPwd($conn, $userPwd) {
    $response = null;
    if ($conn->conectar()) {
        try {
            $conn->beginTransaction();

            $sql = "UPDATE users SET password = :newPassword"
                    . " WHERE username = '" . $_SESSION['usuario'] . "'";
            $params = array();
            $params[0] = array("newPassword", md5($userPwd['newPwd']), "string", 100);
            if ($conn->consulta($sql, $params)) {
                $conn->closeCursor();
                $userId = $_SESSION['idUser'];
                $_SESSION['password'] = md5($userPwd['newPwd']);
                $error = false;

                if (!$error) {
                    $conn->commitTransaction();
                    $response = MessageHandler::getSuccessResponse("Contraseña actualizada!", $userPwd);
                } else {
                    $response = MessageHandler::getErrorResponse("Mi puto error.");
                }
            } else {
                echo MessageHandler::getErrorResponse("Primer consulta error.Edit");
            }
        } catch (Exception $exc) {
            $response = null;
            $conn->rollbackTransaction();
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

function editImg() {
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    $userName = $_SESSION['usuario'];

    //Save File
    //TODO: Validate format and size
    if (validateFileToUpload()) {
        $filenameAndExt = explode(".", $_FILES['file']['name']);
        $destination = '../uploaded/' . md5($filenameAndExt[0]) . "_" . md5($userName) . "." . $filenameAndExt[1];
        if (move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
            $newImgUrl = md5($filenameAndExt[0]) . "_" . md5($userName) . "." . $filenameAndExt[1];
            echo updateUserImg($conn, $newImgUrl);
        } else {
            echo MessageHandler::getErrorResponse("Img error.");
        }
    } else {
        echo MessageHandler::getErrorResponse("Img error.");
    }
}

function updateUserImg($conn, $newImgUrl) {
    $response = null;
    if ($conn->conectar()) {
        $conn->beginTransaction();
        try {

            $sql = "SELECT * FROM users"
                    . " WHERE username = '" . $_SESSION['usuario'] . "'";

            if ($conn->consulta($sql)) {
                $users = $conn->restantesRegistros();
                $currentUser = $users[0];
                $userImgUrl = $currentUser->imagenUrl;
                $deleteDestination = '../uploaded/' . $userImgUrl;
                $conn->closeCursor();

                $sqlUpdateImg = "UPDATE users SET imagenUrl = '" . $newImgUrl . "'"
                        . " WHERE username = '" . $_SESSION['usuario'] . "'";

                if ($userImgUrl !== '') {
                    unlink($deleteDestination);
                }

                if ($conn->consulta($sqlUpdateImg)) {
                    $conn->commitTransaction();
                    $response = MessageHandler::getSuccessResponse("Cambios guardados exitosamente!", array("newImgUrl" => $newImgUrl));
                } else {
                    $response = MessageHandler::getErrorResponse("Mi puto error.");
                }
            } else {
                $response = MessageHandler::getErrorResponse("Primer consulta error.Edit IMG");
            }
        } catch (Exception $exc) {
            $response = null;
            $conn->rollbackTransaction();
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

function registerUser() {
    $request = Slim::getInstance()->request();

    $user = getArrayFromRequest($request);
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);

    //Save File
    //TODO: Validate format and size
    if (validateFileToUpload()) {
        $filenameAndExt = explode(".", $_FILES['file']['name']);
        $fileNewUrl = getNewFileUrl($filenameAndExt[0], $filenameAndExt[1], $user['username']);
        $destination = '../uploaded/' . $fileNewUrl;

        if (move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
            $user['imagenUrl'] = $fileNewUrl;
            echo insertNewUser($conn, $user);
        } else {
            echo MessageHandler::getErrorResponse("Error uploading image.");
        }
    } else {
        //TODO: Return and show message : Img failed to upload
        $user['imagenUrl'] = '';
        echo insertNewUser($conn, $user);
    }
}

function getNewFileUrl($fileName, $fileExt, $username) {
    return md5($fileName) . "_" . md5($username) . "." . $fileExt;
}

//TODO: Refactor into shorter method. 
function insertNewUser($conn, $user) {
    $response = null;
    if ($conn->conectar()) {
        try {
            $conn->beginTransaction();
            $sql = "INSERT INTO users (nombre, apellido, email, telefono, celular, direccion, telefonoEmp, "
                    . "plan ,sitioWeb, imagenUrl, facebookUrl, twitterUrl, linkedinUrl, descService, servicioOfrecido1,"
                    . " servicioOfrecido2, servicioOfrecido3, servicioOfrecido4, servicioOfrecido5, servicioOfrecido6, descServiceLong, username, password,markers,cardcolor) "
                    . "VALUES (:nombre, :apellido, :email, :telefono, :celular, :direccion, :telefonoEmp, "
                    . " :plan, :sitioWeb, :imagenUrl, :facebookUrl, :twitterUrl, :linkedinUrl, :descService, :servicioOfrecido1,"
                    . " :servicioOfrecido2, :servicioOfrecido3, :servicioOfrecido4, :servicioOfrecido5, :servicioOfrecido6,:descServiceLong, :username, :password,:markers,:cardcolor)";
            $params = setUserParams($user, false);
            if ($conn->consulta($sql, $params)) {
                $user['id'] = $conn->ultimoIdInsert();
                $conn->closeCursor();
                $error = false;
                if (!$error) {
                    $sqlPagos = "INSERT INTO `formasdepago` (`idUser`,`contado`,`debito`,`credito`,`otras`) 
                                VALUES(:idUser , :contado , :debito, :credito, :otras)";
                    $paramsPagos = array();
                    $paramsPagos[0] = array("idUser", $user['id'], "int", 11);
                    $paramsPagos[1] = array("contado", $user['formaDePago']['contado'], "int", 1);
                    $paramsPagos[2] = array("debito", $user['formaDePago']['debito'], "int", 1);
                    $paramsPagos[3] = array("credito", $user['formaDePago']['credito'], "int", 1);
                    $paramsPagos[4] = array("otras", $user['formaDePago']['otras'], "string", 30);

                    if ($conn->consulta($sqlPagos, $paramsPagos)) {
                        $sqlDias = "INSERT INTO `diasatencion`(`idUser`,`lunes`,`martes`,`miercoles`,`jueves`,`viernes`,`sabado`,`domingo`, `horario`) 
                                    VALUES (:idUser, :lunes, :martes, :miercoles, :jueves, :viernes, :sabado, :domingo, :horario)";
                        $paramsDias = array();
                        $paramsDias[0] = array("idUser", $user['id'], "int", 11);
                        $paramsDias[1] = array("lunes", $user['diasAtencion']['lunes'], "int", 1);
                        $paramsDias[2] = array("martes", $user['diasAtencion']['martes'], "int", 1);
                        $paramsDias[3] = array("miercoles", $user['diasAtencion']['miercoles'], "int", 1);
                        $paramsDias[4] = array("jueves", $user['diasAtencion']['jueves'], "int", 1);
                        $paramsDias[5] = array("viernes", $user['diasAtencion']['viernes'], "int", 1);
                        $paramsDias[6] = array("sabado", $user['diasAtencion']['sabado'], "int", 1);
                        $paramsDias[7] = array("domingo", $user['diasAtencion']['domingo'], "int", 1);
                        $paramsDias[8] = array("horario", $user['horario'], "string", 1000);

                        if ($conn->consulta($sqlDias, $paramsDias)) {
                            $conn->closeCursor();

                            $matches = array();
                            $categorias = $user['categoria'];
                            preg_match_all('!\d+!', $categorias, $matches);

                            foreach ($matches[0] as $categoria) {
                                $sqlInsertCat = "INSERT INTO categoria_usuario VALUES (:idCategoria, :idUser)";

                                $paramsInsertCat = array();
                                $paramsInsertCat[0] = array("idCategoria", (int) $categoria, "int");
                                $paramsInsertCat[1] = array("idUser", (int) $user["id"], "int");

                                if (!$conn->consulta($sqlInsertCat, $paramsInsertCat)) {
                                    $error = true;
                                }
                            }

                            $matches = array();
                            $departamentos = $user['departamento'];
                            preg_match_all('!\d+!', $departamentos, $matches);

                            foreach ($matches[0] as $departamento) {
                                $sqlGetLocId = "SELECT barrioId FROM departamentos d join barrios b on d.idDepartamento = b.departamentoId where d.idDepartamento = :idDepartamento";

                                $paramsGetLoc = array();
                                $paramsGetLoc[0] = array("idDepartamento", (int) $departamento, "int");

                                if (!$conn->consulta($sqlGetLocId, $paramsGetLoc)) {
                                    $error = true;
                                } else {
                                    $localidades = $conn->restantesRegistros();
                                    if (isset($localidades[0]))
                                        $localidadId = $localidades[0]->barrioId;

                                    $sqlInsertDpto = "INSERT INTO localidad_user VALUES (:idUser, :idLocalidad)";

                                    $paramsInsertDpto = array();
                                    $paramsInsertDpto[0] = array("idLocalidad", (int) $localidadId, "int");
                                    $paramsInsertDpto[1] = array("idUser", (int) $user["id"], "int");

                                    if (!$conn->consulta($sqlInsertDpto, $paramsInsertDpto)) {
                                        $error = true;
                                    }
                                }
                            }
                        } else {
                            $error = true;
                        }
                    } else {
                        //tirar error
                        $error = true;
                    }
                }

                if (!$error) {
                    $conn->commitTransaction();
                    $response = MessageHandler::getSuccessResponse("Se registro exitosamente!", $user);
                } else {
                    $response = MessageHandler::getErrorResponse("Mi puto error.");
                }
            } else {
                echo MessageHandler::getErrorResponse("Primer consulta error.");
            }
        } catch (Exception $exc) {
            var_dump($exc->getMessage());
            $response = null;
            $conn->rollbackTransaction();
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

function editUser() {
    $request = Slim::getInstance()->request();

    $user = getArrayFromRequest($request);
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    //$user['imagenUrl'] = '';

    echo updateUser($conn, $user);
}

function updateUser($conn, $user) {
    $response = null;
    if ($conn->conectar()) {
        try {
            $conn->beginTransaction();

            $sql = "UPDATE users SET nombre = :nombre, apellido = :apellido, email = :email, telefono = :telefono, celular = :celular,"
                    . " direccion = :direccion, telefonoEmp = :telefonoEmp, "
                    . " plan = :plan ,sitioWeb = :sitioWeb, facebookUrl = :facebookUrl,"
                    . " twitterUrl = :twitterUrl, linkedinUrl = :linkedinUrl, descService = :descService, servicioOfrecido1 = :servicioOfrecido1,"
                    . " servicioOfrecido2 = :servicioOfrecido2, servicioOfrecido3 = :servicioOfrecido3, servicioOfrecido4 = :servicioOfrecido4,"
                    . " servicioOfrecido5 = :servicioOfrecido5, servicioOfrecido6 = :servicioOfrecido6, descServiceLong = :descServiceLong,"
                    . " username = :username,markers = :markers, cardcolor = :cardcolor"
                    . " WHERE username = '" . $_SESSION['usuario'] . "'";

            $params = setUserParams($user, true);
            if ($conn->consulta($sql, $params)) {
                $conn->closeCursor();
                $userId = $_SESSION['idUser'];
                $error = false;
                $sqlDeletePago = "DELETE FROM formasdepago WHERE idUser = " . $userId;
                if ($conn->consulta($sqlDeletePago)) {
                    $conn->closeCursor();
                    $sqlPagos = "INSERT INTO `formasdepago` (`idUser`,`contado`,`debito`,`credito`,`otras`) 
                        VALUES(:idUser , :contado , :debito, :credito, :otras)";
                    $paramsPagos = array();
                    $paramsPagos[0] = array("idUser", $userId, "int", 11);
                    $paramsPagos[1] = array("contado", $user['formaDePago']['contado'], "int", 1);
                    $paramsPagos[2] = array("debito", $user['formaDePago']['debito'], "int", 1);
                    $paramsPagos[3] = array("credito", $user['formaDePago']['credito'], "int", 1);
                    $paramsPagos[4] = array("otras", $user['formaDePago']['otras'], "string", 30);

                    if ($conn->consulta($sqlPagos, $paramsPagos)) {
                        $conn->closeCursor();

                        $sqlDeleteDias = "DELETE FROM diasatencion WHERE idUser = " . $userId;
                        if ($conn->consulta($sqlDeleteDias)) {
                            $conn->closeCursor();

                            $sqlDias = "INSERT INTO `diasatencion`(`idUser`,`lunes`,`martes`,`miercoles`,`jueves`,`viernes`,`sabado`,`domingo`, `horario`) 
                            VALUES (:idUser, :lunes, :martes, :miercoles, :jueves, :viernes, :sabado, :domingo, :horario)";
                            $paramsDias = array();
                            $paramsDias[0] = array("idUser", $userId, "int", 11);
                            $paramsDias[1] = array("lunes", $user['diasAtencion']['lunes'], "int", 1);
                            $paramsDias[2] = array("martes", $user['diasAtencion']['martes'], "int", 1);
                            $paramsDias[3] = array("miercoles", $user['diasAtencion']['miercoles'], "int", 1);
                            $paramsDias[4] = array("jueves", $user['diasAtencion']['jueves'], "int", 1);
                            $paramsDias[5] = array("viernes", $user['diasAtencion']['viernes'], "int", 1);
                            $paramsDias[6] = array("sabado", $user['diasAtencion']['sabado'], "int", 1);
                            $paramsDias[7] = array("domingo", $user['diasAtencion']['domingo'], "int", 1);
                            $paramsDias[8] = array("horario", $user['horario'], "string", 1000);

                            if ($conn->consulta($sqlDias, $paramsDias)) {
                                $conn->closeCursor();

                                $sqlDeleteLoc = "DELETE FROM localidad_user WHERE idUser = " . $userId;
                                if ($conn->consulta($sqlDeleteLoc)) {
                                    $conn->closeCursor();

                                    $matches = array();
                                    $departamentos = $user['departamento'];
                                    preg_match_all('!\d+!', $departamentos, $matches);

                                    foreach ($matches[0] as $departamento) {
                                        $sqlGetLocId = "SELECT barrioId FROM departamentos d join barrios b on d.idDepartamento = b.departamentoId where d.idDepartamento = :idDepartamento";

                                        $paramsGetLoc = array();
                                        $paramsGetLoc[0] = array("idDepartamento", (int) $departamento, "int");

                                        if (!$conn->consulta($sqlGetLocId, $paramsGetLoc)) {
                                            $error = true;
                                        } else {
                                            $localidades = $conn->restantesRegistros();
                                            if (isset($localidades[0]))
                                                $localidadId = $localidades[0]->barrioId;

                                            $sqlInsertDpto = "INSERT INTO localidad_user VALUES (:idUser, :idLocalidad)";

                                            $paramsInsertDpto = array();
                                            $paramsInsertDpto[0] = array("idLocalidad", (int) $localidadId, "int");
                                            $paramsInsertDpto[1] = array("idUser", (int) $userId, "int");

                                            if (!$conn->consulta($sqlInsertDpto, $paramsInsertDpto)) {
                                                $error = true;
                                            }
                                        }
                                    }

                                    if (!$error) {

                                        $sqlDeleteCat = "DELETE FROM categoria_usuario WHERE idUser = " . $userId;
                                        if ($conn->consulta($sqlDeleteCat)) {
                                            $conn->closeCursor();

                                            $matches = array();
                                            $categorias = $user['categoria'];
                                            preg_match_all('!\d+!', $categorias, $matches);

                                            foreach ($matches[0] as $categoria) {
                                                $sqlInsertCat = "INSERT INTO categoria_usuario VALUES (:idCategoria, :idUser)";

                                                $paramsInsertCat = array();
                                                $paramsInsertCat[0] = array("idCategoria", (int) $categoria, "int");
                                                $paramsInsertCat[1] = array("idUser", (int) $userId, "int");

                                                if (!$conn->consulta($sqlInsertCat, $paramsInsertCat)) {
                                                    $error = true;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                $error = true;
                            }
                        } else {
                            $error = true;
                        }
                    } else {
                        //tirar error
                        $error = true;
                    }
                } else {
                    $error = true;
                }

                if (!$error) {
                    $conn->commitTransaction();
                    $response = MessageHandler::getSuccessResponse("Cambios guardados exitosamente!", $user);
                } else {
                    $response = MessageHandler::getErrorResponse("Mi puto error.");
                }
            } else {
                echo MessageHandler::getErrorResponse("Primer consulta error.Edit");
            }
        } catch (Exception $exc) {
            var_dump($exc);
            $response = null;
            $conn->rollbackTransaction();
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
        "id" => is_null($request->post('id')) ? "" : $request->post('id'),
        "nombre" => is_null($request->post('nombre')) ? "" : $request->post('nombre'),
        "apellido" => is_null($request->post('apellido')) ? "" : $request->post('apellido'),
        "email" => is_null($request->post('email')) ? "" : $request->post('email'),
        "telefono" => is_null($request->post('telefono')) ? "" : $request->post('telefono'),
        "celular" => is_null($request->post('celular')) ? "" : $request->post('celular'),
        "direccion" => is_null($request->post('direccion')) ? "" : $request->post('direccion'),
        "telefonoEmp" => is_null($request->post('telefonoEmp')) ? "" : $request->post('telefonoEmp'),
        "departamento" => is_null($request->post('departamento')) ? "" : $request->post('departamento'),
        "categoria" => is_null($request->post('categoria')) ? "" : $request->post('categoria'),
        "barrio" => $request->post('barrio') == 'null' ? NULL : $request->post('barrio'), //is_null($request->post('barrio')) ? "" : ($request->post('barrio') == '-1' ? null : $request->post('barrio')),
        "plan" => is_null($request->post('plan')) ? "" : $request->post('plan'),
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
        "cardcolor" => is_null($request->post('cardcolor')) ? NULL : $request->post('cardcolor'),
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
            "otras" => $formaDePago->otras,
        ),
        "descServiceLong" => is_null($request->post('descServiceLong')) ? "" : $request->post('descServiceLong'),
        "username" => is_null($request->post('username')) ? "" : $request->post('username'),
        "password" => is_null($request->post('password')) ? "" : $request->post('password'),
        "markers" => $request->post('markers'),
        "horario" => is_null($request->post('horario')) ? "" : $request->post('horario')
    );
}

function checkUsername() {
    $request = Slim::getInstance()->request();
    $userName = json_decode($request->getBody())->userName;
    if(isset($_SESSION['usuario']) && !empty($_SESSION['usuario']) && $userName == $_SESSION['usuario'])
    {
        echo MessageHandler::getSuccessResponse("Consulta exitosa", array("isUnique" => true));
    }
    else
    {
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
    
    
}

function checkEmail() {
    $request = Slim::getInstance()->request();
    $email = json_decode($request->getBody())->email;
    if(isset($_SESSION['email']) && !empty($_SESSION['email']) && $email == $_SESSION['email'])
    {
        echo MessageHandler::getSuccessResponse("Consulta exitosa", array("isUnique" => true));
    }
    else{
        $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
        $response = null;
        if ($conn->conectar()) {
            $sql = "SELECT 1 FROM users WHERE email = :email";
            $params = array();
            $params[0] = array("email", $email, "string", 100);

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
}

function validateFileToUpload() {
    if (!isset($_FILES['file']))
        return false;
    $fileSize = $_FILES['file']['size'];

    if ($fileSize > 2000000)
        return false;

    return true;
}

function setUserParams($user, $forEdit) {
    $params = array();
    $params[0] = array("nombre", $user['nombre'], "string", 50);
    $params[1] = array("apellido", $user['apellido'], "string", 50);
    $params[2] = array("email", $user['email'], "string", 50);
    $params[3] = array("telefono", $user['telefono'], "string", 50);
    $params[4] = array("celular", $user['celular'], "string", 50);
    $params[5] = array("direccion", $user['direccion'], "string", 2000);
    $params[6] = array("telefonoEmp", $user['telefonoEmp'], "string", 2000);
    $params[7] = array("markers", $user['markers'], "string", 2000);
    $params[8] = array("username", $user['username'], "string", 50);
    $params[9] = array("descServiceLong", $user['descServiceLong'], "string", 1000);
    $params[10] = array("plan", (int) $user['plan'], "int", 5);
    $params[11] = array("sitioWeb", $user['sitioWeb'], "string", 50);
    $params[12] = array("facebookUrl", $user['facebookUrl'], "string", 250);
    $params[13] = array("twitterUrl", $user['twitterUrl'], "string", 250);
    $params[14] = array("linkedinUrl", $user['linkedinUrl'], "string", 250);
    $params[15] = array("descService", $user['descService'], "string", 150);
    $params[16] = array("servicioOfrecido1", $user['servicioOfrecido1'], "string", 20);
    $params[17] = array("servicioOfrecido2", $user['servicioOfrecido2'], "string", 20);
    $params[18] = array("servicioOfrecido3", $user['servicioOfrecido3'], "string", 20);
    $params[19] = array("servicioOfrecido4", $user['servicioOfrecido4'], "string", 20);
    $params[20] = array("servicioOfrecido5", $user['servicioOfrecido5'], "string", 20);
    $params[21] = array("servicioOfrecido6", $user['servicioOfrecido6'], "string", 20);
    if (!$forEdit) {
        $params[22] = array("imagenUrl", $user['imagenUrl'], "string", 100);
        $params[23] = array("password", md5($user['password']), "string", 100);
    }
    $params[24] = array("cardcolor", $user['cardcolor'], "string", 60);
    return $params;
}
