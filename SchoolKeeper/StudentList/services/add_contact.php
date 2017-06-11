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
 $contactid =  test_input($_POST["contactid"]);
 $type =  test_input($_POST["type"]);
 $contact   = test_input($_POST["contact"]);
switch ($type) {
    case 1:
        $type_text = "Mobile : ";
        break;
    case 2:
        $type_text = "Landline : ";
        break;
    case 3:
        $type_text = "Email : ";
        break;
};

 $contact =  $type_text." ".$contact;
 
 $contactid =  $quote.test_input($_POST["contactid"]).$quote;
 $type =  $quote.test_input($_POST["type"]).$quote;
 $contact  = $quote.test_input($_POST["contact"]).$quote;
 
$result = mysqli_query( $conn,"select max(serial) as serial from contact where contactid = $contactid " ) ;
$row = mysqli_fetch_array($result);
$serial = $row["serial"]; 
$serial = $serial + 1;
unset($result, $row );
$serial = $quote.$serial.$quote;
$sql = "INSERT INTO contact ( contactid , serial ,type ,number  ) VALUES ( $contactid , $serial , $type ,$contact )";
if ($conn->query($sql) === TRUE) {
//*-Delete the dummy record
$sql = "delete from contact where contactid = $contactid and serial = 0";
$conn->query($sql);
$response['status'] = "success"; 
$response['contact'] = $contact; 
echo json_encode($response); 
} else {
$response['status'] = $conn->query($sql) ;   
echo json_encode($response);
}
}



?>