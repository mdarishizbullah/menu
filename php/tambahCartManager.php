<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}

include "conn.php";

$id_pelanggan = $_SESSION["id_pelanggan"];
$id_produk = $_POST['id_produk'];

$query = mysqli_query($conn,"SELECT * FROM cart WHERE id_produk = '$id_produk' AND id_pelanggan = '$id_pelanggan'");
$checkCount = $query->num_rows;
while ($row = mysqli_fetch_object($query)){
	$cart_jumlah = $row->cart_jumlah;
}
if($checkCount == 0){
$save = mysqli_query($conn,"INSERT INTO cart(id_pelanggan,id_produk,cart_jumlah) VALUES ('$id_pelanggan','$id_produk','1')");
echo "save";
}else if($checkCount > 0){
$cart_jumlah += 1;
$update = mysqli_query($conn,"UPDATE cart SET cart_jumlah = '$cart_jumlah' WHERE id_produk = '$id_produk' AND id_pelanggan = '$id_pelanggan'");
echo "update";
}