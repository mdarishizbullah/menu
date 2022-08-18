<?php
include "conn.php";

$stmt = $conne->prepare("SELECT * FROM produk_kategori WHERE kat_jenis = 'minuman' ORDER BY id_pkategori ASC");
$stmt->execute();

$nota = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nota);