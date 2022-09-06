<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$kat_jenis = $_POST['kat_jenis'];
$kat_sub = $_POST['kat_sub'];

$result = mysqli_query($conn, "SELECT id_pkategori FROM produk_kategori");
$id_pkategori = ($result->num_rows) + 1;

$sql = "INSERT INTO produk_kategori (id_pkategori, kat_jenis, kat_sub) VALUES ('$id_pkategori','$kat_jenis','$kat_sub')";

if ($conn->query($sql) === TRUE) {
 echo "Kategori baru sudah ditambahkan";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}