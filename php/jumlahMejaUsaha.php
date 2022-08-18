<?php
include "conn.php";

$stmt = $conne->prepare("SELECT * FROM data_usaha");
$stmt->execute();

$nota = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nota);