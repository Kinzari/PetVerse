<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "petversedata"; // Database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

$petID = $data['petID'];
$petName = $data['name'];
$speciesID = $data['speciesID'];
$breedID = $data['breedID'];
$dateOfBirth = $data['dateOfBirth'];
$ownerID = $data['ownerID'];
$contactNumber = $data['contactNumber'];
$address = $data['address'];

if (empty($petID) || empty($petName) || empty($speciesID) || empty($breedID) || empty($dateOfBirth) || empty($ownerID) || empty($contactNumber) || empty($address)) {
    echo json_encode(['success' => false, 'error' => 'All fields are required.']);
    exit;
}

$stmt = $conn->prepare("UPDATE Pets SET Name = ?, SpeciesID = ?, BreedID = ?, DateOfBirth = ?, OwnerID = ?, ContactNumber = ?, Address = ? WHERE PetID = ?");
$stmt->bind_param("siisissi", $petName, $speciesID, $breedID, $dateOfBirth, $ownerID, $contactNumber, $address, $petID);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Pet updated successfully']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to update pet']);
}

$stmt->close();
$conn->close();
?>
