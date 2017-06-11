<?php
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
//------------------------------------------//
if ($_SERVER["REQUEST_METHOD"] == "POST") {

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mohit";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$quote = "'";
$userid = test_input($_POST["userid"]);
if($userid !== ''){
$where1 = 'userid = '.$quote.$userid.$quote ;
};

$uniqid = test_input($_POST["uniqid"]);
if($uniqid !== ''){
$where2 = 'uniqid = '.$quote.$uniqid.$quote ;
};

$contactid = test_input($_POST["contactid"]);
if($contactid !== ''){
$where3 = 'contactid = '.$quote.$contactid.$quote ;
};

$addressid = test_input($_POST["addressid"]);
if($addressid !== ''){
$where4 = 'addressid = '.$quote.$addressid.$quote ;
};

if($where1 !== ''){
$sql = "delete from user where ".$where1;
};
if($conn->query($sql)){
	$sql = "delete from address where ".$where2;
	if($conn->query($sql)){
	$sql = "delete from address where ".$where3;
	if($conn->query($sql)){
	$sql = "delete from address where ".$where4;
	if($conn->query($sql)){
	$response["status"] = 'Success';
	}}}
}else{
	$response["status"] = 'Failure';
}
	echo json_encode($response);
}	
?>