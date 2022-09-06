<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_product = $_POST['id_product'];
$prd_nama = $_POST['prd_nama'];
$prd_image = $_POST['prd_image'];
$prd_harga = $_POST['prd_harga'];
$id_pkategori = $_POST['id_pkategori'];
$id_paccess = $_POST['id_product'];


$sql = "INSERT INTO produk (id_product, prd_nama, prd_harga, prd_image, id_pkategori, id_paccess, prd_avail) VALUES ('$id_product','$prd_nama','$prd_harga','$prd_image','$id_pkategori','$id_product','1')";

if ($conn->query($sql) === TRUE) {
 echo "Menu baru sudah ditambahkan";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}