<?php
include "conn.php";

$id_pelanggan = $_POST['id_pelanggan'];

$result = mysqli_query($conn, "SELECT id_pelanggan FROM pelanggan WHERE id_pelanggan = '$id_pelanggan'");

if(mysqli_fetch_assoc($result)){
	echo "0";
}else{
	echo "1";
}