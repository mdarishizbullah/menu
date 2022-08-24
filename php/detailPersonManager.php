<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_pelanggan = $_SESSION["id_pelanggan"];

$stmt = $conne->prepare("SELECT * FROM pelanggan WHERE id_pelanggan ='$id_pelanggan'");
$stmt->execute();

$nota = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nota);