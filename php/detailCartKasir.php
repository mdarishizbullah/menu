<?php
session_start();
if(!isset($_SESSION["ksradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_pelanggan = $_SESSION["id_pelanggan"];

$stmt = $conne->prepare("SELECT * FROM cart c JOIN produk p ON c.id_produk = p.id_product JOIN produk_kategori k ON p.id_pkategori  = k.id_pkategori  WHERE c.id_pelanggan ='$id_pelanggan'");
$stmt->execute();

$nota = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nota);