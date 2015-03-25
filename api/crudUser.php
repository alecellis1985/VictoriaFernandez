<?php


function getUser($id) {
    $sql = "select * FROM users WHERE id=" . $id . " ORDER BY id";
    try {
        $dbConnection = getConnection();
        $queryResult = $dbConnection->query($sql);
        $users = $queryResult->fetchAll(PDO::FETCH_OBJ);
        $dbConnection = null;
        echo json_encode($users);
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

function addUser() {
    $request = Slim::getInstance()->request();
    $user = json_decode($request->getBody());
    $sql = "INSERT INTO users (username, first_name, last_name, address) VALUES (:username, :first_name, :last_name, :address)";
    try {
        $dbConnection = getConnection();
        $query = $dbConnection->prepare($sql);
        $query->bindParam("username", $user->username);
        $query->bindParam("first_name", $user->first_name);
        $query->bindParam("last_name", $user->last_name);
        $query->bindParam("address", $user->address);
        $query->execute();
        $user->id = $dbConnection->lastInsertId();
        $dbConnection = null;
        echo json_encode($user);
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

function updateUser($id) {
    $request = Slim::getInstance()->request();
    $user = json_decode($request->getBody());
    $sql = "UPDATE users SET username=:username, first_name=:first_name, last_name=:last_name, address=:address WHERE id=:id";
    try {
        $dbConnection = getConnection();
        $query = $dbConnection->prepare($sql);
        $query->bindParam("username", $user->username);
        $query->bindParam("first_name", $user->first_name);
        $query->bindParam("last_name", $user->last_name);
        $query->bindParam("address", $user->address);
        $query->bindParam("id", $id);
        $query->execute();
        $dbConnection = null;
        echo json_encode($user);
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

function deleteUser($id) {
    $sql = "DELETE FROM users WHERE id=" . $id;
    try {
        $dbConnection = getConnection();
        $queryResult = $dbConnection->query($sql);
        $users = $queryResult->fetchAll(PDO::FETCH_OBJ);
        $dbConnection = null;
        echo json_encode($users);
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}
