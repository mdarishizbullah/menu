<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$tutupbuku = $_POST['tutupbuku'];
$bukabuku = $_POST['bukabuku'];

$result = mysqli_query($conn, "SELECT sum(not_total) FROM nota WHERE not_ver = '2' AND not_Jpembayaran = 'cash' AND id_nota BETWEEN '$bukabuku' AND '$tutupbuku'");
$row = mysqli_fetch_assoc($result);
$isi = $row["sum(not_total)"];

echo json_encode($isi);