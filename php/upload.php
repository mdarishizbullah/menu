<?php
session_start();
if(!isset($_SESSION["mngradm"])){
	header("Location: index.php");
	exit;
}
include "conn.php";

function uploadImage($array_name, $imageName, $path)
{
    if (move_uploaded_file($_FILES[$array_name]['tmp_name'], $path . $imageName))
    {
        echo json_encode(['success' => 1]);
        return (true);
    }
    else
    {
        echo json_encode(['success' => 0]);
        return (false);
    }
}
if ($_FILES['image']['name'] != ''){
    $image = $_FILES['image']['name'];
    uploadImage('image', $image, 'asset/test/');
}