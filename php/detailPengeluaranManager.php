<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_pengeluaran = $_POST['id_pengeluaran'];

$stmt = $conne->prepare("SELECT * FROM pengeluaran p JOIN pelanggan g ON p.id_pelanggan = g.id_pelanggan WHERE p.id_pengeluaran = '$id_pengeluaran'");
$stmt->execute();

$nota = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nota);