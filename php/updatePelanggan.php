<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_pelanggan = $_POST['id_pelanggan'];
$plg_jabatan = $_POST['plg_jabatan'];

$sql = "UPDATE pelanggan SET plg_jabatan = $plg_jabatan WHERE id_pelanggan = $id_pelanggan";
if ($conn->query($sql) === TRUE) {
	echo "berhasil update database";
} else {
   echo "gagal update database";
  exit;
}