<?php
session_start();
if(!isset($_SESSION["ksradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_nota = $_POST['id_nota'];
$id_pelanggan = $_SESSION["id_pelanggan"];

$sql = "UPDATE nota SET not_ver = 2, id_karyawan = $id_pelanggan WHERE id_nota = $id_nota";

if ($conn->query($sql) === TRUE) {
 echo  "updated";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}