<?php
	header('Content-type: application/json');
	function test_input($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "myapp";
		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 
		
		$quote = "'";
		$ac_num = $quote.test_input($_POST["ac_num"]).$quote; 
		$ac_type = $quote.test_input($_POST["ac_type"]).$quote;
		$user1  = $quote.test_input($_POST["user1"]).$quote;
		$user2  = $quote.test_input($_POST["user2"]).$quote;
		
		$sql = "INSERT INTO acct_h (ac_num ,ac_type,user1,user2) VALUES ( $ac_num, $ac_type,$user1,$user2 )";
		if ($conn->query($sql) === TRUE) {
			$response['status'] = "success";  
			echo json_encode($response); 
			} else {
			$response['status'] = "Failure";
			echo json_encode($response);
		}
	}
	
	
	
?>