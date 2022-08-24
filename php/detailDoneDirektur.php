<?php
session_start();
if(!isset($_SESSION["mngr"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_pelanggan = $_SESSION["id_pelanggan"];

$stmt = $conne->prepare("SELECT * FROM nota WHERE id_pelanggan ='$id_pelanggan' ORDER BY id_nota DESC");
$stmt->execute();

$nota = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nota);