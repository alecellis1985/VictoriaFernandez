<?php
    function sendMail() {
    $owner_email = 'alecellis1985@gmail.com';
    $headers = 'From:' . $_POST["email"];
    $subject = 'Mensaje de ' . $_POST["nombre"] . ' ' . $_POST["apellido"];
    $messageBody = "";
    $telefono = $_POST['telefono'];
    $mensaje = $_POST['mensaje'];
    
    if(!empty($telefono))

    if($_POST['telefono']){		
            $messageBody .= '<p>Telefono: ' . $_POST['telefono'] . '</p>' . "\n";
            $messageBody .= '<br>' . "\n";
    }
    if($_POST['mensaje']){		
            $messageBody .= '<p>Mensaje: ' . $_POST['phone'] . '</p>' . "\n";
            $messageBody .= '<br>' . "\n";
    }	
    
    $messageBody = strip_tags($messageBody);
    
    try{
        if(!mail($owner_email, $subject, $messageBody, $headers)){
                $response = MessageHandler::getErrorResponse("Error al enviar el mail, por favor intente mas tarde.");
        }else{
                $response = MessageHandler::getSuccessResponse("El mail ha sido enviado!",$depto);
        }
    }catch(Exception $e){
            $response = MessageHandler::getErrorResponse("Error al enviar el mail, por favor intente mas tarde.");
    }
    echo $response;
}
