<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="utf-8">

        <link rel="stylesheet" href="style/server.css">

        <title>Leonie Server</title>
    </head>

    <body>

    	<header>
    		<h1>Welcome to Leonie access server!</h1>
    		<p>Open URL width your Smartphone by using the QR code:</p>
    	</header>

	<?php
		include "qr/qrlib.php";

		header('Content-Type: text/html; charset=utf-8'); // sorgt für die korrekte Kodierung
		header('Cache-Control: must-revalidate, pre-check=0, no-store, no-cache, max-age=0, post-check=0'); // ist mal wieder wichtig wegen IE

		$seed = str_split('abcdefghijklmnopqrstuvwxyz'
                     .'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                     .'0123456789'); // and any other characters
    	shuffle($seed); // probably optional since array_is randomized; this may be redundant
    	$key = '';
    	foreach (array_rand($seed, 50) as $k) $key .= $seed[$k];
 
		$myFile = "key.txt";
		$fh = fopen($myFile, 'w');
		fwrite($fh,$key);
		fclose($fh);

		$url = "http://".getHostByName(getHostName())."/client.php?key=".$key;

		// create a QR Code with this text and display it
		QRcode::png($url, "urlQr.png", "L", 10, 10);

		echo "<div id='qrImg'><img src='urlQr.png'></div>";

		echo "<p id='url'><a href='".$url."'>".$url."</a></p>";
	?>

	</body>
</html>