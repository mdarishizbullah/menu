<?php
session_start();
if(!isset($_SESSION["ksradm"])){
	header("Location: index.php");
	exit;
}

include "conn.php";

$stmt = $conne->prepare("SELECT * FROM produk p JOIN produk_kategori k ON p.id_pkategori = k.id_pkategori WHERE p.prd_avail = '2' ORDER BY p.id_paccess ASC ");
$stmt->execute();

$nota = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nota);