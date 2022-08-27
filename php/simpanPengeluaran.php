<?php
session_start();
if(!isset($_SESSION["ksradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_pelanggan = $_SESSION["id_pelanggan"];

$id_pengeluaran = $_POST['id_pengeluaran'];
$judul_pengeluaran = $_POST['judul_pengeluaran'];
$total_pengeluaran = $_POST['total_pengeluaran'];
$catatan_pengeluaran = $_POST['catatan_pengeluaran'];

$sql = "INSERT INTO pengeluaran (id_pengeluaran, id_pelanggan, judul_pengeluaran ,total_pengeluaran, catatan_pengeluaran) VALUES ('$id_pengeluaran','$id_pelanggan','$judul_pengeluaran','$total_pengeluaran','$catatan_pengeluaran')";

if ($conn->query($sql) === TRUE) {
 echo "Pesanan diterima";
} else {
  echo "id pelanggan ".$id_pelanggan."id pengeluaran".$id_pengeluaran."Error: " . $sql . "<br>" . $conn->error;
}