<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "php/conn.php";

$id_product = $_POST['id_product'];

$result = mysqli_query($conn, "SELECT prd_image FROM produk WHERE id_product = '$id_product'");
$row = mysqli_fetch_assoc($result);
$isi = $row["prd_image"];

	$path = "asset/menu/".$isi;
	if(!unlink($path)){
		echo "gagal menghapus photo lama";
		exit;
	}else{
		echo "berhasil menghapus photo lama";
}