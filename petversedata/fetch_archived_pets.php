<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "petversedata"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => "Connection failed: " . $conn->connect_error]));
}

$query = "SELECT Pets.PetID, Pets.Name AS PetName, Owners.Name AS OwnerName, Species.SpeciesName, Breeds.BreedName, Pets.DateOfBirth
          FROM Pets
          JOIN Owners ON Pets.OwnerID = Owners.OwnerID
          JOIN Species ON Pets.SpeciesID = Species.SpeciesID
          JOIN Breeds ON Pets.BreedID = Breeds.BreedID
          WHERE Pets.Archived = 1";  // Only select archived pets
          
$result = $conn->query($query);

$archivedPets = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $archivedPets[] = $row;
    }
}

echo json_encode(['success' => true, 'pets' => $archivedPets]);

$conn->close();
?>
