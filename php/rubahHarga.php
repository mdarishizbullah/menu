<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_product = $_POST['id_product'];
$prd_harga = $_POST['prd_harga'];
$id_pelanggan = $_SESSION["id_pelanggan"];

$sql = "UPDATE produk SET prd_harga = '$prd_harga' WHERE id_product = '$id_product'";

if ($conn->query($sql) === TRUE) {
 echo  "updated";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}