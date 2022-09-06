<?php
session_start();
if(!isset($_SESSION["ksradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$tutupbuku = $_POST['tutupbuku'];
$bukabuku = $_POST['bukabuku'];

$stmt = $conne->prepare("SELECT p.prd_nama, k.kat_sub, SUM(t.trs_quantity) AS total FROM transaksi t, nota n, produk p, produk_kategori k WHERE t.id_nota = n.id_nota AND p.id_pkategori = k.id_pkategori AND t.id_produk = p.id_product AND n.not_ver = '2' AND n.id_nota BETWEEN '$bukabuku' AND '$tutupbuku' GROUP BY p.prd_nama ORDER BY total DESC");
$stmt->execute();

$isi = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($isi);