<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "petversedata";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => "Connection failed: " . $conn->connect_error]));
}

$query = "SELECT * FROM Breeds";
$result = $conn->query($query);

$breeds = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $breeds[] = $row;
    }
}

echo json_encode(['success' => true, 'breeds' => $breeds]);

$conn->close();
?>
