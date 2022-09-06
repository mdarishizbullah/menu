<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_product = $_POST['id_product'];
$prd_nama = $_POST['prd_nama'];

$sql = "UPDATE produk SET prd_nama = '$prd_nama' WHERE id_product = '$id_product'";

if ($conn->query($sql) === TRUE) {
 echo  "updated";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}