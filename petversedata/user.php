<?php
header('Content-Type: application/json');
// Allow from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (e.g., POST, GET, OPTIONS)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Allow specific headers (e.g., Content-Type, Authorization)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle OPTIONS requests for preflight checks
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "petversedata";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['operation']) && $data['operation'] === 'signup') {
    $username = $data['data']['username'];
    $displayName = $data['data']['displayName'];
    $email = $data['data']['email'];
    $password = password_hash($data['data']['password'], PASSWORD_BCRYPT);

    if (empty($username) || empty($displayName) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'error' => 'All fields are required.']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO users (username, display_name, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $displayName, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'User registered successfully', 'displayName' => $displayName]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Registration failed.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid operation.']);
}

$conn->close();
?>
