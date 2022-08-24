<?php
include "conn.php";

$id_product = $_POST['id_product'];

$stmt = $conne->prepare("SELECT * FROM produk p JOIN produk_kategori k ON p.id_pkategori = k.id_pkategori WHERE p.id_product ='$id_product'");
$stmt->execute();

$nota = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nota);