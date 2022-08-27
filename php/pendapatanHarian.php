<?php
session_start();
if(!isset($_SESSION["ksradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$tutupbuku = $_POST['tutupbuku'];
$bukabuku = $_POST['bukabuku'];

$stmt = $conne->prepare("SELECT * FROM nota WHERE not_ver = '2' AND id_nota BETWEEN '$bukabuku' AND '$tutupbuku' ORDER BY id_nota DESC");
$stmt->execute();

$nota = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nota);