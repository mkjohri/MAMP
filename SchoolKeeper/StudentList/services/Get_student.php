 <  ? php
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
	$dbname = "mydb";
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: ".$conn->connect_error);
	}
	$quote = "'";
	$where = '';
	$userid = test_input($_POST["studentid"]);
	if ($userid !== '') {
		$where = 'studentid like '.$quote.$userid.$quote;
	};
	$fname = test_input($_POST["name1"]);
	if ($fname !== '') {
		if ($where !== '') {
			$where = $where.' && name1 like '.$quote.$fname.$quote;
		} else {
			$where = 'name1 like '.$quote.$fname.$quote;
		}
	};
	$lname = test_input($_POST["name3"]);
	if ($lname !== '') {
		if ($where !== '') {
			$where = $where.' && name3 like '.$quote.$lname.$quote;
		} else {
			$where = 'name3 like '.$quote.$lname.$quote;
		}
	};
	$dob = test_input($_POST["dob"]);
	if ($dob !== '') {
		$dob = substr($dob, 4, 4).'-'.substr($dob, 2, 2).'-'.substr($dob, 0, 2);
		if ($where !== '') {
			$where = $where.' && dob like '.$quote.$dob.$quote;
		} else {
			$where = 'dob like'.$quote.$dob.$quote;
		}
	};

	if ($where !== '') {
		$sql = "select * from student where ".$where;
	};

	$result = mysqli_query($conn, $sql);
	$jsonData = array();
	while ($row = mysqli_fetch_assoc($result)) {
		$jsonData[] = $row;
	}
	echo json_encode($jsonData);
	$conn->close();
}

?  >