<?php
/**
 * EXPOHELPERS API (PHP Version)
 * This file handles all data operations using suppliers.json
 * No Node.js required on the server.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$data_file = 'suppliers.json';

// --- CONFIGURATION ---
$pass1 = "GSMexhibition@2027";
$pass2 = "ICUIvrDJdd@2027_Katsu";

// --- HELPERS ---

function get_data() {
    global $data_file;
    if (!file_exists($data_file)) {
        return [];
    }
    $content = file_get_contents($data_file);
    return json_decode($content, true) ?: [];
}

function save_data($data) {
    global $data_file;
    file_put_contents($data_file, json_encode(array_values($data), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function generate_uuid() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

// --- ROUTING ---

$method = $_SERVER['REQUEST_METHOD'];
$path = isset($_GET['path']) ? $_GET['path'] : '';
$path = trim($path, '/');

// 1. GET Public Suppliers
if ($method === 'GET' && $path === 'suppliers') {
    $data = get_data();
    $approved = array_filter($data, function($s) {
        return isset($s['approved']) && $s['approved'] === true;
    });
    echo json_encode(array_values($approved));
    exit;
}

// 2. GET Single Supplier
if ($method === 'GET' && preg_match('/^suppliers\/([a-zA-Z0-9-]+)$/', $path, $matches)) {
    $id = $matches[1];
    $data = get_data();
    foreach ($data as $s) {
        if ($s['id'] === $id) {
            echo json_encode($s);
            exit;
        }
    }
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
    exit;
}

// 3. POST Public Registration
if ($method === 'POST' && $path === 'suppliers') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        http_response_code(400);
        exit;
    }
    $data = get_data();
    $new = $input;
    $new['id'] = generate_uuid();
    $new['approved'] = false;
    $new['createdAt'] = date('c');
    $data[] = $new;
    save_data($data);
    echo json_encode(['success' => true]);
    exit;
}

// 4. POST Admin Login
if ($method === 'POST' && $path === 'admin/login') {
    $input = json_decode(file_get_contents('php://input'), true);
    $p1_input = isset($input['p1']) ? $input['p1'] : '';
    $p2_input = isset($input['p2']) ? $input['p2'] : '';
    if ($p1_input === $pass1 && $p2_input === $pass2) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid passwords']);
    }
    exit;
}

// 5. GET Admin Suppliers
if ($method === 'GET' && $path === 'admin/suppliers') {
    $p1_get = isset($_GET['p1']) ? $_GET['p1'] : '';
    $p2_get = isset($_GET['p2']) ? $_GET['p2'] : '';
    if ($p1_get === $pass1 && $p2_get === $pass2) {
        echo json_encode(get_data());
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
    }
    exit;
}

// 6. POST Admin Add Supplier
if ($method === 'POST' && $path === 'admin/suppliers') {
    $input = json_decode(file_get_contents('php://input'), true);
    $p1_val = isset($input['p1']) ? $input['p1'] : '';
    $p2_val = isset($input['p2']) ? $input['p2'] : '';
    if ($p1_val === $pass1 && $p2_val === $pass2) {
        $data = get_data();
        $new = $input['supplier'];
        $new['id'] = generate_uuid();
        $new['approved'] = true;
        $new['createdAt'] = date('c');
        $data[] = $new;
        save_data($data);
        echo json_encode($new);
    } else {
        http_response_code(401);
    }
    exit;
}

// 7. PATCH Admin Approve Supplier
if ($method === 'PATCH' && preg_match('/^admin\/suppliers\/([a-zA-Z0-9-]+)\/approve$/', $path, $matches)) {
    $id = $matches[1];
    $input = json_decode(file_get_contents('php://input'), true);
    $p1_val = isset($input['p1']) ? $input['p1'] : '';
    $p2_val = isset($input['p2']) ? $input['p2'] : '';
    if ($p1_val === $pass1 && $p2_val === $pass2) {
        $data = get_data();
        $found = false;
        foreach ($data as &$s) {
            if ($s['id'] === $id) {
                $s['approved'] = true;
                $found = true;
                break;
            }
        }
        if ($found) {
            save_data($data);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(404);
        }
    } else {
        http_response_code(401);
    }
    exit;
}

// 8. DELETE Admin Supplier
if ($method === 'DELETE' && preg_match('/^admin\/suppliers\/([a-zA-Z0-9-]+)$/', $path, $matches)) {
    $id = $matches[1];
    $input = json_decode(file_get_contents('php://input'), true);
    $p1_val = isset($input['p1']) ? $input['p1'] : '';
    $p2_val = isset($input['p2']) ? $input['p2'] : '';
    if ($p1_val === $pass1 && $p2_val === $pass2) {
        $data = get_data();
        $filtered = array_filter($data, function($s) use ($id) {
            return $s['id'] !== $id;
        });
        save_data($filtered);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(401);
    }
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Endpoint not found']);
