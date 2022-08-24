<?php
session_start();
if(!isset($_SESSION["mngr"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

$id_pelanggan = $_SESSION["id_pelanggan"];

$sql = "DELETE FROM cart WHERE id_pelanggan = $id_pelanggan";

if ($conn->query($sql) === TRUE) {
 echo  "deleted";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}