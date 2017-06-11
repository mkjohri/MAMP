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
		$userid = $quote.test_input($_POST["userid"]).$quote ;
		
		$sql = "select contactid from user as contactid where userid = $userid";
		$result = mysqli_query($conn,$sql);
		$row = mysqli_fetch_array($result);
		$contactid = "'".$row["contactid"]."'";
		unset($sql,$result);
		$sql = "select * from contact where contactid = $contactid && serial != '0' " ;
		$result = mysqli_query($conn,$sql);
		$emparray = array();
		while($row = mysqli_fetch_assoc($result))
		{
			switch ($row["type"]) {
				case '1':
				$row["type"] = 'Mobile';
				break;
				case '2':
				$row["type"] = 'Email';
				break;
				case '3':
				$row["type"] = 'Landline';
				break;
			}
			$emparray[] = $row;
		};
		echo json_encode($emparray);	
		$conn->close();
	}
	


?>