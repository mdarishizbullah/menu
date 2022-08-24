<?php
session_start();
if(!isset($_SESSION["login"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_pelanggan = $_SESSION["id_pelanggan"];
$id_produk = $_POST['id_produk'];
$cart_jumlah = $_POST['cart_jumlah'];

$sql = "UPDATE cart SET cart_jumlah = $cart_jumlah WHERE id_pelanggan = $id_pelanggan AND id_produk = $id_produk";

if ($conn->query($sql) === TRUE) {
 echo  "deleted";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}