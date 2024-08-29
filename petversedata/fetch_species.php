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

$query = "SELECT * FROM Species";
$result = $conn->query($query);

$species = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $species[] = $row;
    }
}

echo json_encode(['success' => true, 'species' => $species]);

$conn->close();
?>
