<?php
	header('Content-Type: text/html; charset=utf-8'); // sorgt für die korrekte Kodierung
	header('Cache-Control: must-revalidate, pre-check=0, no-store, no-cache, max-age=0, post-check=0'); // ist mal wieder wichtig wegen IE

	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
	    $ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
	    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
	    $ip = $_SERVER['REMOTE_ADDR'];
	}

	$keyClient = $_POST['key'];

	$keyFile = "key.txt";
	$kfh = fopen($keyFile, 'r');
	$keyServer = fread($kfh, filesize($keyFile));
	fclose($kfh);


	$myFile = "WebAppData.txt";
	$fh = fopen($myFile, 'w');
	fwrite($fh,"key=".$keyClient."\n");

	if ($keyClient == $keyServer) {
		fwrite($fh,"keyValid=TRUE\n");
		fwrite($fh,"ip=".$ip."\n");
		fwrite($fh,"x=".strtoupper($_POST['x'])."\n");
		fwrite($fh,"y=".strtoupper($_POST['y'])."\n");

		udp("x=".strtoupper($_POST['x'])." y=".strtoupper($_POST['y'])."\0");
		
		echo date('H:i:s');

	}else{
		fwrite($fh,"keyValid=FALSE\n");
		fwrite($fh,"x=0\n");
		fwrite($fh,"y=0\n");

		echo "FALSE";
	}

	fwrite($fh, "date=".date('Y-m-d H:i:s'));
	fclose($fh);


	function udp ($msg){
		$sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);

	    $len = strlen($msg);

	    socket_sendto($sock, $msg, $len, 0, '134.103.107.164', 8888); //Leonie: 192.168.1.26
	    socket_close($sock);
	}