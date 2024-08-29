<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "petversedata"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => "Connection failed: " . $conn->connect_error]));
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Debugging: Output the received data
error_log(print_r($data, true)); // This will log the received data to your PHP error log
file_put_contents("debug.txt", print_r($data, true)); // This will save the data to a debug.txt file

$petID = isset($data['petID']) ? $data['petID'] : null;

if (empty($petID)) {
    echo json_encode(['success' => false, 'error' => 'Pet ID is required.']);
    exit;
}

$query = "UPDATE Pets SET Archived = 1 WHERE PetID = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $petID);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Pet archived successfully']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to archive pet']);
}

$stmt->close();
$conn->close();

?>
