<?php
session_start();
if(!isset($_SESSION["ksradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_product = $_POST['id_product'];

$sql = "UPDATE produk SET prd_avail = 2 WHERE id_product = $id_product";

if ($conn->query($sql) === TRUE) {
 echo  "updated";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}