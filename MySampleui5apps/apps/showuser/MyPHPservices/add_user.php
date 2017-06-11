<?php
 header('Content-type: application/json');
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function date_to_internal($data){
if(strlen($data) == 10 
&& substr($data,4,1) == "-" 
&& substr($data,7,1) == "-" 
&& !preg_match("/[^0-9-]+$/",$data)){

  $date = substr($data, 8, 2);
  $year = substr($data,0,4);
  $month = substr($data,5,2);
  if($month < 12){
if (substr($year,2,2)%4 == 0 && $month == "02" && $date > 29){
unset($data);
}elseif( $month == "02" && $date > 28){
unset($data);
}elseif(($month == "01" || $month == "03" || $month == "05" || $month == "07" || $month == "08" || $month == "10"|| $month == "12") && $date > 31){
unset($data);
}else{
$dash = "-";
$data = $year.$dash.$month.$dash.$date;
} 
}else{
unset($data);
}
  }else{
  unset($data);
  }
}
//---------------------------------------------------


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
$result = mysqli_query( $conn,"select max(userid) as userid from user" ) ;
$row = mysqli_fetch_array($result);
$userid = $row["userid"];
$userid = $userid + 1;
$userid = str_pad($userid, 10, "0", STR_PAD_LEFT);
unset($result, $row );
 
$result = mysqli_query($conn,"select max(addressid) as addressid from address" ) ;
$row = mysqli_fetch_array($result);
$addressid = $row["addressid"];
$addressid = $addressid + 1;
$addressid = str_pad($addressid, 10, "0", STR_PAD_LEFT);
unset($result, $row );

$result = mysqli_query($conn, "select max(contactid) as contactid from contact" ) ;
$row = mysqli_fetch_array($result);
$contactid = $row["contactid"];
$contactid = $contactid + 1;
$contactid = str_pad($contactid, 10, "0", STR_PAD_LEFT);
unset($result, $row );

$result = mysqli_query($conn, "select max(uniqid) as uniqid from uniqid_tab" ) ;
$row = mysqli_fetch_array($result);
$uniqid = $row["uniqid"];
$uniqid = $uniqid + 1;
$uniqid = str_pad($uniqid, 10, "0", STR_PAD_LEFT);
unset($result, $row );

 $quote = "'";

 $dob  	 = $quote.test_input($_POST["dob"]).$quote; 
 $gender = $quote.test_input($_POST["gender"]).$quote;
 $fname  = $quote.test_input($_POST["fname"]).$quote;
 $mname  = $quote.test_input($_POST["mname"]).$quote;
 $lname  = $quote.test_input($_POST["lname"]).$quote;

$sql = "INSERT INTO address ( addressid ) VALUES ( $addressid )";
$conn->query($sql);
unset($sql);
$sql = "INSERT INTO contact ( contactid  ) VALUES ( $contactid )";
$conn->query($sql);
unset($sql);
$sql = "INSERT INTO uniqid_tab( uniqid ) VALUES ( $uniqid )";
$conn->query($sql);
unset($sql);
$response = array();
$sql = "INSERT INTO user( userid , uniqid , contactid, addressid , gender , dob , fname , mname , lname   ) VALUES ( $userid , $uniqid , $contactid , $addressid , $gender , $dob , $fname , $mname , $lname )";
if ($conn->query($sql) === TRUE) {
$response['userid'] = $userid;
$response['uniqid'] = $uniqid;
$response['addressid'] = $addressid;
$response['contactid'] = $contactid;
$response['status'] = "success";  
echo json_encode($response); 
} else {
$response['status'] = $conn->query($sql) ;
$response['uniqid'] = $uniqid;
$response['addressid'] = $addressid;
$response['contactid'] = $contactid;
$response['sql'] = $sql ;
echo json_encode($response);
}
}



?>