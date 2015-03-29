<?php

//function getUsers() {
//    $sql = "select * FROM users ORDER BY id";
//    try {
//        $dbConnection = getConnection();
//        $queryResult = $dbConnection->query($sql);
//        $users = $queryResult->fetchAll(PDO::FETCH_OBJ);
//        $dbConnection = null;
//        echo json_encode($users);
//    } catch (PDOException $e) {
//        echo '{"error":{"text":' . $e->getMessage() . '}}';
//    }
//}
