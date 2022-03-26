<?php
error_reporting(0);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

// if ($_SERVER['HTTP_HOST'] == 'localhost') {
	if ($_SERVER['HTTP_HOST'] == '1a80-103-148-144-194.ngrok.io') {

	$dns = "localhost:3307";
	$user = "root";
	$pass = "";
	$db = "ecom";
} else {
	$dns = "localhost";  
	$user = "id18663048_ecomm";
	$pass = "2Am{p^EC}4yW&TzP";
	$db = "id18663048_ecom";
}
$connection = new mysqli($dns, $user, $pass, $db);
mysqli_set_charset($connection,'utf8');


if (mysqli_connect_errno()) {
	printf("Connect failed: %s", mysqli_connect_error());
	exit();
}
echo "Connected successfully";