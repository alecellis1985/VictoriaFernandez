<?php
    function sendEmail() {
    $request = Slim::getInstance()->request();
    $emailPostData = json_decode($request->getBody());
    $para = "info@profesionales.com.uy";
    $headers = "From:" . $emailPostData->email;
    
    $subject = "Mensaje de nombre: " . $emailPostData->nombre . " Apellido: " . $emailPostData->apellido;
    $messageBody = "";

    if(!empty($emailPostData->telefono)){		
        $messageBody .= "<p>Telefono: " . $emailPostData->telefono . "</p>" . "\n";
        $messageBody .= "<br>" . "\n";
    }
    if(!empty($emailPostData->mensaje)){		
        $messageBody .= $emailPostData->mensaje;
    }

    $messageBody = strip_tags($messageBody);

    try{
        if(mail($para, $subject, $messageBody, $headers)){
                $response = MessageHandler::getSuccessResponse("El mail ha sido enviado!",null);
        }else{
                $response = MessageHandler::getErrorResponse("Error al enviar el mail, por favor intente mas tarde.");
        }
    }catch(Exception $e){
            $response = MessageHandler::getErrorResponse("Error al enviar el mail, por favor intente mas tarde.");
    }
    echo $response;
}
