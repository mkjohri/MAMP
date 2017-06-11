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
$where = '';
$userid = test_input($_POST["userid"]);
if($userid !== ''){
$where = 'userid like '.$quote.$userid.$quote ;
};
$fname =  test_input($_POST["fname"]) ;
if($fname !== ''){
if($where !== ''){
$where = $where.' && fname like '.$quote.$fname.$quote;
}else{
$where = 'fname like '.$quote.$fname.$quote;
}
};
$lname =  test_input($_POST["lname"]) ;
if($lname !== ''){
if($where !== ''){
$where = $where.' && lname like '.$quote.$lname.$quote;
}else{
$where = 'lname like '.$quote.$lname.$quote;
}
};
$dob   = test_input($_POST["dob"]) ;
if($dob !== ''){
	$dob = substr($dob, 4 ,4).'-'.substr($dob,2 , 2).'-'.substr($dob,0, 2) ;
if($where !== ''){
$where = $where.' && dob like '.$quote.$dob.$quote;
}else{
$where = 'dob like'.$quote.$dob.$quote;
}
};

if($where !== ''){
$sql = "select * from user where ".$where;
};

$result = mysqli_query($conn,$sql);
$jsonData = array();
while ($row = mysqli_fetch_assoc($result)) {
    $jsonData[] = $row;
}
echo json_encode($jsonData);	
$conn->close();
}



?>