<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}


function uploadImage($array_name, $imageName, $path)
{
    if (move_uploaded_file($_FILES[$array_name]['tmp_name'], $path . $imageName))
    {
        echo json_encode(['success' => 1]);
        return (true);
		
		$namaGambar = $_POST['prd_image'];
		unlink($namaGambar);
		
		include "php/conn.php";
		
		$id_product = $_POST['id_product'];

		$sql = "UPDATE produk SET prd_image = '$imageName' WHERE id_product = '$id_product'";
		$conn->query($sql);
    }
    else
    {
        echo json_encode(['success' => 0]);
        return (false);
    }
}
if ($_FILES['image']['name'] != ''){
    $image = $_FILES['image']['name'];
    uploadImage('image', $image, 'asset/menu/');
}