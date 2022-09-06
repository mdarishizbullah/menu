<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "php/conn.php";

$gambar = upload();

if(!$gambar){
	echo "gambar gagal terupload";
	exit;
}else{
	echo "gambar terupload";
	exit;
}

function upload(){
	$namafile = $_FILES['image']['name'];
	$ukuranfile = $_FILES['image']['size'];
	$error = $_FILES['image']['error'];
	$tmpName = $_FILES['image']['tmp_name'];
	
	if($error ===4){
		echo "file tidak ditemukan";
		return false;
	}
	
	$ekstensigambarvalid =['jpg','jpeg','png'];
	$ekstensigambar = explode('.',$namafile);
	$ekstensigambar = strtolower(end($ekstensigambar));
	
	if(!in_array($ekstensigambar, $ekstensigambarvalid)){
		return false;
	}
	
	if($ukuranfile>1000000){
		echo "ukuran file terlalu besar";
		return false;
	}
	
	move_uploaded_file($tmpName, 'asset/menu/'.$namafile);
	
	return true;
	
}