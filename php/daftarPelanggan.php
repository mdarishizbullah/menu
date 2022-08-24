<?php
include "conn.php";

$id_pelanggan = $_POST['id_pelanggan'];
$plg_nama = $_POST['plg_nama'];
$plg_password = password_hash($_POST['plg_password'], PASSWORD_DEFAULT);
$plg_jabatan = 1;
$plg_ver = 1;

$sql = "INSERT INTO pelanggan (id_pelanggan, plg_nama, plg_password ,plg_jabatan, plg_ver) VALUES ('$id_pelanggan','$plg_nama','$plg_password','$plg_jabatan','$plg_ver')";

if ($conn->query($sql) === TRUE) {
 echo "Anda sudah terdaftar silahkan login";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}