<?php
 header('Content-type: application/json');
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
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

 $quote = "'";
 $addressid =  test_input($_POST["addressid"]);
 $address_type =  test_input($_POST["address_type"]);
 $line1 = test_input($_POST["line1"]); 
 $line2 = test_input($_POST["line2"]);
 $city  = test_input($_POST["city"]);
 $state = test_input($_POST["state"]);
 $zip   = test_input($_POST["zip"]);
if($address_type == 1){
$address_type_text = "Permanent Address : ";
}elseif($address_type == 2){
$address_type_text = "Correspondence Address : ";
};

 $address =  $address_type_text." ".$line1." ".$line2." ".$city." ".$state." ".$zip;
 
 $addressid =  $quote.test_input($_POST["addressid"]).$quote;
 $address_type =  $quote.test_input($_POST["address_type"]).$quote;
 $line1 = $quote.test_input($_POST["line1"]).$quote; 
 $line2 = $quote.test_input($_POST["line2"]).$quote;
 $city  = $quote.test_input($_POST["city"]).$quote;
 $state = $quote.test_input($_POST["state"]).$quote;
 $zip   = $quote.test_input($_POST["zip"]).$quote;
 
$result = $conn->query("select max(serial) as serial from address where addressid = $addressid " ) ;
$row = $result->fetch_array();
$serial = $row["serial"];
$serial = $serial + 1;

unset($result, $row ,$sql );
$serial = $quote.$serial.$quote;
$sql = "INSERT INTO address ( addressid , serial , address_type ,line1 ,line2 , city, state, zip  ) VALUES ( $addressid , $serial , $address_type ,$line1 , $line2 , $city, $state, $zip )";
if ($conn->query($sql) === TRUE) {
//*-Delete the dummy record
$sql = "delete from address where addressid = $addressid and serial = 0";
$conn->query($sql);
$response['status'] = "success"; 
$response['addressid'] = $addressid; 
$response['address'] = $address;
echo json_encode($response); 
} else {
echo $sql;
$response['status'] = $conn->query($sql) ;   
echo json_encode($response);
}
}



?>