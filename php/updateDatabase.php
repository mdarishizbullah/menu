<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_product = $_POST['id_product'];
$fileName = $_POST['fileName'];

$sql = "UPDATE produk SET prd_image = '$fileName' WHERE id_product = $id_product";
if ($conn->query($sql) === TRUE) {
	echo "berhasil update database";
} else {
   echo "gagal update database";
  exit;
}