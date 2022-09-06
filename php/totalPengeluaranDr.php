<?php
session_start();
if(!isset($_SESSION["mngr"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$tutupbuku = $_POST['tutupbuku'];
$bukabuku = $_POST['bukabuku'];

$result = mysqli_query($conn, "SELECT sum(total_pengeluaran) FROM pengeluaran WHERE id_pengeluaran BETWEEN '$bukabuku' AND '$tutupbuku'");
$row = mysqli_fetch_assoc($result);
$isi = $row["sum(total_pengeluaran)"];

echo json_encode($isi);