<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "gestion_evaluaciones");

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case "GET":
        $result = $conn->query("SELECT * FROM evaluaciones");
        $evaluaciones = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($evaluaciones);
        break;

    case "POST":
        $nombre = $data["nombre"];
        $tipo = $data["tipo"];
        $fecha = $data["fecha"];
        $calificacion = $data["calificacion"];
        $nombre_evaluacion = $data["nombre_evaluacion"];

        if ($tipo === "recuperación" && $calificacion > 70) {
            echo json_encode(["error" => "La calificación para una evaluación de recuperación no puede superar el 70%"]);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO evaluaciones (nombre, tipo, fecha, calificacion, nombre_evaluacion) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssds", $nombre, $tipo, $fecha, $calificacion, $nombre_evaluacion);

        echo json_encode(["success" => $stmt->execute()]);
        break;

    case "PUT":
        $id = $data["id"];
        $nombre = $data["nombre"];
        $tipo = $data["tipo"];
        $fecha = $data["fecha"];
        $calificacion = $data["calificacion"];
        $nombre_evaluacion = $data["nombre_evaluacion"];

        if ($tipo === "recuperación" && $calificacion > 70) {
            echo json_encode(["error" => "La calificación para una evaluación de recuperación no puede superar el 70%"]);
            exit;
        }

        $stmt = $conn->prepare("UPDATE evaluaciones SET nombre=?, tipo=?, fecha=?, calificacion=?, nombre_evaluacion=? WHERE id=?");
        $stmt->bind_param("sssdsi", $nombre, $tipo, $fecha, $calificacion, $nombre_evaluacion, $id);

        echo json_encode(["success" => $stmt->execute()]);
        break;

    case "DELETE":
        $id = $data["id"];
        $stmt = $conn->prepare("DELETE FROM evaluaciones WHERE id=?");
        $stmt->bind_param("i", $id);

        echo json_encode(["success" => $stmt->execute()]);
        break;

    default:
        echo json_encode(["error" => "Método no permitido"]);
}
?>
