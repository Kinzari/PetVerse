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
    die(json_encode(['status' => 'error', 'message' => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['identifier']) && isset($data['password'])) {
    $identifier = $data['identifier'];
    $password = $data['password'];

    // Prepare the SQL statement to fetch user details
    $stmt = $conn->prepare("SELECT id, password, display_name FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $identifier, $identifier);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hashedPassword, $displayName);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashedPassword)) {
            // On successful login, return userId and displayName
            echo json_encode([
                'status' => 'success',
                'message' => 'Login successful',
                'userId' => $id,
                'displayName' => $displayName
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid password.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Username or email not found.']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Username/email and password are required.']);
}

$conn->close();
?>
