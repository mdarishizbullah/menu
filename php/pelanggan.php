<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$stmt = $conne->prepare("SELECT id_pelanggan, plg_nama FROM pelanggan WHERE plg_jabatan = '1' ORDER BY plg_nama DESC");
$stmt->execute();

$nota = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nota);