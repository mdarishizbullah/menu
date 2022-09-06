<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_product = $_POST['id_product'];

$sql = "UPDATE produk SET prd_avail = 3 WHERE id_product = $id_product";

if ($conn->query($sql) === TRUE) {
 echo  "Menu sudah di hapus";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}