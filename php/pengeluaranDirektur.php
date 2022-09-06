<?php
session_start();
if(!isset($_SESSION["mngr"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$tutupbuku = $_POST['tutupbuku'];
$bukabuku = $_POST['bukabuku'];

$stmt = $conne->prepare("SELECT * FROM pengeluaran p JOIN pelanggan g ON p.id_pelanggan = g.id_pelanggan WHERE p.id_pengeluaran BETWEEN '$bukabuku' AND '$tutupbuku'  ORDER BY p.id_pengeluaran ASC");
$stmt->execute();

$nota = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nota);