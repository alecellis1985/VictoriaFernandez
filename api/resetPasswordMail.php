<?php
function recoverUserPassword() {
    $request = Slim::getInstance()->request();
    $emailPostData = json_decode($request->getBody());
    
    if(empty($emailPostData->usermail) || !isset($emailPostData->usermail)){	
        echo MessageHandler::getErrorResponse("El mail ingresado esta incompleto.");
        return;
    }
    
    $pwd = bin2hex(openssl_random_pseudo_bytes(4));
    $conn = new ConexionBD(DRIVER, SERVIDOR, BASE, USUARIO, CLAVE);
    
     if ($conn->conectar()) {
        $sql = "SELECT idUser FROM users WHERE email = :email";
        $params = array();
        $params[0] = array("email", $emailPostData->email, "string");
        //$planes = $conn->restantesRegistros();
        if ($conn->consulta($sql)) {
            $userId = $conn->restantesRegistros();
            $updatePw = "UPDATE users SET passwoerd = :password WHERE idUser = " . $userId;
            $params = array();
            $params[0] = array("password", $pwd, "string");
            if ($conn->consulta($updatePw)) {
                $to = $emailPostData->usermail;
                $headers = 'From: info@profesionales.com.uy';
                $subject = 'Recuperacion de contraseña';
                $messageBody = "";

                $messageBody .= '<p>Este mail ha sido enviado debido a su petición de recuperación de contraseña <br>\n';
                $messageBody .= '<p>Su contraseña nueva es: ' . $pwd . '</p>' . "\n";
                $messageBody .= '<br>' . "\n";
                $messageBody .= 'Vuelve a http://profesionales.uy/ y no te pierdas de contratar al profesional buscado.';
                $messageBody = strip_tags($messageBody);
                try{
                    if(!mail($to, $subject, $messageBody, $headers)){
                            $response = MessageHandler::getErrorResponse("Error al enviar el mail, por favor intente mas tarde.");
                    }else{
                            $response = MessageHandler::getSuccessResponse("Se ha enviado un mail con una nueva contraseña a su mail!");
                    }
                }catch(Exception $e){
                        $response = MessageHandler::getErrorResponse("Error al enviar el mail, por favor intente mas tarde.");
                }
            }
            else{
                 $response = MessageHandler::getErrorResponse("Error al enviar el mail, por favor intente mas tarde.");
            }
        }
        else{
            $response = MessageHandler::getErrorResponse("Error al enviar el mail, por favor intente mas tarde.");
        }
    }


echo $response;
}
