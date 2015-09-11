<?php
    function sendEmail() {
    $request = Slim::getInstance()->request();
    $emailPostData = json_decode($request->getBody());
    $owner_email = 'info@profesionales.com.uy';
    $headers = 'From:' . $emailPostData->email;
    $subject = 'Mensaje de ' . $emailPostData->nombre . ' ' . $emailPostData->apellido;
    $messageBody = "";

    if(!empty($emailPostData->telefono)){		
            $messageBody .= '<p>Telefono: ' . $emailPostData->telefono . '</p>' . "\n";
            $messageBody .= '<br>' . "\n";
    }
    if(!empty($emailPostData->mensaje)){		
            $messageBody .= $emailPostData->mensaje;
    }

    $messageBody = strip_tags($messageBody);


    try{
        if(!mail($owner_email, $subject, $messageBody, $headers)){
                $response = MessageHandler::getErrorResponse("Error al enviar el mail, por favor intente mas tarde.");
        }else{
                $response = MessageHandler::getSuccessResponse("El mail ha sido enviado!");
        }
    }catch(Exception $e){
            $response = MessageHandler::getErrorResponse("Error al enviar el mail, por favor intente mas tarde.");
    }
    echo $response;
}
