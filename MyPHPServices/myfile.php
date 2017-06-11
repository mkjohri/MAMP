<?php

	//*-Database connection parameters
	//*-Server name
		$servername = "localhost";
	//*-Username
		$username   = "root";
	//*-Username
		$password   = "";
	//*-Database name
		$dbname     = "mydb";

		if ($_SERVER["REQUEST_METHOD"] == "POST"){
		//*-Create connection
			$conn = new mysqli($servername, $username, $password, $dbname);
		//*-Check if connection is successful
			if ($conn->connect_error) {
				die("Connection failed: " . $conn->connect_error);
			}else{
				$sql      = 'SELECT * FROM `USER`';
				$result   = mysqli_query($conn,$sql);
				$jsonData = array();

				while ($row = mysqli_fetch_assoc($result)){
					$jsonData[] = $row;
				}
				echo json_encode($jsonData);	
				$conn->close();
			}
		}else{
			echo 'Wrong method';
		}	
?>