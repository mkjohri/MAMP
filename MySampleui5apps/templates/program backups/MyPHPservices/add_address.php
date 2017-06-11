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

 $address =  $addressid." ".$address_type." ".$line1." ".$line2." ".$city." ".$state." ".$zip;
 
 $addressid =  $quote.test_input($_POST["addressid"]).$quote;
 $address_type =  $quote.test_input($_POST["address_type"]).$quote;
 $line1 = $quote.test_input($_POST["line1"]).$quote; 
 $line2 = $quote.test_input($_POST["line2"]).$quote;
 $city  = $quote.test_input($_POST["city"]).$quote;
 $state = $quote.test_input($_POST["state"]).$quote;
 $zip   = $quote.test_input($_POST["zip"]).$quote;
 
$result = mysqli_query( $conn,"select max(serial) as serial from address where addressid = $addressid " ) ;
$row = mysqli_fetch_array($result);
$serial = $row["serial"];
$serial = $serial + 1;
unset($result, $row );
$serial = $quote.$serial.$quote;
$sql = "INSERT INTO address ( addressid , serial , address_type ,line1 ,line2 , city, state, zip  ) VALUES ( $addressid , $serial , $address_type ,$line1 , $line2 , $city, $state, $zip )";
if ($conn->query($sql) === TRUE) {
$response['status'] = "success";  
$response['address'] = $address;
echo json_encode($response); 
} else {
echo $sql;
$response['status'] = $conn->query($sql) ;   
echo json_encode($response);
}
}



?>