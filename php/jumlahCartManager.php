<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_pelanggan = $_SESSION["id_pelanggan"];

$query = mysqli_query($conn,"SELECT * FROM cart WHERE id_pelanggan = '$id_pelanggan'");
$checkCount = $query->num_rows;
echo $checkCount;