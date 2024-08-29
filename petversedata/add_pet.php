<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON input.']);
    exit;
}

// Assuming you have your necessary validation here
$ownerName = isset($data['ownerName']) ? trim($data['ownerName']) : null;
$contactNumber = isset($data['contactNumber']) ? trim($data['contactNumber']) : null;
$address = isset($data['address']) ? trim($data['address']) : null;
$petName = isset($data['petName']) ? trim($data['petName']) : null;
$speciesID = isset($data['speciesID']) ? trim($data['speciesID']) : null;
$breedID = isset($data['breedID']) ? trim($data['breedID']) : null;
$dateOfBirth = isset($data['dateOfBirth']) ? trim($data['dateOfBirth']) : null;

if (empty($ownerName) || empty($contactNumber) || empty($address) || empty($petName) || empty($speciesID) || empty($breedID) || empty($dateOfBirth)) {
    echo json_encode(['success' => false, 'error' => 'All fields are required.']);
    exit;
}

// Database connection and insertion logic
$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "petversedata"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => "Connection failed: " . $conn->connect_error]));
}

// Insert into the Owners table if not already exists
$checkOwnerQuery = "SELECT OwnerID FROM Owners WHERE Name = ? AND ContactDetails = ? AND Address = ?";
$stmt = $conn->prepare($checkOwnerQuery);
$stmt->bind_param("sss", $ownerName, $contactNumber, $address);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($ownerID);
    $stmt->fetch();
} else {
    $insertOwnerQuery = "INSERT INTO Owners (Name, ContactDetails, Address) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($insertOwnerQuery);
    $stmt->bind_param("sss", $ownerName, $contactNumber, $address);
    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'error' => 'Failed to insert owner details.']);
        exit;
    }
    $ownerID = $stmt->insert_id;
}

// Insert the pet details into the Pets table
$insertPetQuery = "INSERT INTO Pets (Name, SpeciesID, BreedID, DateOfBirth, OwnerID) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($insertPetQuery);
$stmt->bind_param("siisi", $petName, $speciesID, $breedID, $dateOfBirth, $ownerID);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Pet added successfully']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to add pet']);
}

$stmt->close();
$conn->close();
?>
