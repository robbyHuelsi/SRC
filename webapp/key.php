<?php
	include "qr/qrlib.php";

	header('Content-Type: text/xml; charset=utf-8'); // sorgt für die korrekte Kodierung
	header('Cache-Control: must-revalidate, pre-check=0, no-store, no-cache, max-age=0, post-check=0'); // ist mal wieder wichtig wegen IE


	$clientFile = "clients.txt";
	$clientsLoad = false;
	$keysDeleted = false;
	$newKey = "";

	$keys = [];
	$ips = [];
	$names= [];

	$url = "";

	//>> Load client list
		$cfh = fopen($clientFile, 'r');
		if ($cfh) {
			while (($buffer = fgets($cfh, 4096)) !== false) {
				list($keys[], $ips[], $names[]) = split(',', $buffer);
			}
			if (feof($cfh)) {
				$clientsLoad = true;
			}
			fclose($cfh);
		}
	//<< loading -- END

	if ($_POST['newKey'] == "true" || end($ips) != "0.0.0.0") {

		//>> Delete all unused keys
			for ($i=0; $i < count($keys); $i++) { 
				if ($ips[$i] == "0.0.0.0") {
					unset($keys[$i]);
					unset($ips[$i]);
					unset($names[$i]);
					$keysDeleted = true;
				}
			}
			$keys = array_values($keys);
			$ips = array_values($ips);
			$names = array_values($names);
		//<< deleting -- END

		//>> Create new key
			$seed = str_split('abcdefghijklmnopqrstuvwxyz'
		                    .'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		                    .'0123456789');
		    shuffle($seed); // probably optional since array_is randomized; this may be redundant
		    foreach (array_rand($seed, 50) as $k) $newKey .= $seed[$k];

		    array_push($keys, $newKey);
		    array_push($ips, "0.0.0.0");
		    array_push($names, "NEW");
	    //<< creating key -- END


		$url = "http://".getHostByName(getHostName()).":".$_POST['port'].$_POST['path']."/client.php?key=".$newKey;

		// create a QR Code with this text and display it
		QRcode::png($url, "urlQr.png", "L", 10, 10);

		$newUrl = true;

	}else if ($_POST['removeClient'] != "") {
		//>> Delete ip
			for ($i=0; $i < count($keys); $i++) { 
				if ($ips[$i] == $_POST['removeClient']) {
					unset($keys[$i]);
					unset($ips[$i]);
					unset($names[$i]);
					$keysDeleted = true;
				}
			}
			$keys = array_values($keys);
			$ips = array_values($ips);
			$names = array_values($names);
		//<< deleting -- END

	}else{
		$url = "http://".getHostByName(getHostName()).":".$_POST['port'].$_POST['path']."/client.php?key=".end($keys);
	};


	if ($clientsLoad && $keysDeleted) {
		//>> Save file with all new entries
			$cfh = fopen($clientFile, 'w');
			for ($i=0; $i < count($keys); $i++) {
				fwrite($cfh,$keys[$i].",".$ips[$i].",".$names[$i].",\n");
			}
			fclose($cfh);
		//<< saving -- END
	} elseif ($clientsLoad && $newKey != "") {
		//>> Only add one entry to file
		$cfh = fopen($clientFile, 'a');
		fwrite($cfh,$newKey.",0.0.0.0,NEW,\n");
		fclose($cfh);
		//<< adding -- END
	}



	//>> answer request 
		echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
		echo "<formatname>\n";
			echo "<rcurl>".$url."</rcurl>\n";
			echo "<newUrl>".($newUrl?"true":"false")."</newUrl>\n";
			echo "<clients>";
				for ($i=0; $i < count($ips); $i++) {
					echo "<client>";
						echo "<name>".$names[$i]."</name>\n";
						echo "<ip>".$ips[$i]."</ip>\n";
						echo "<key>".$keys[$i]."</key>\n";
					echo "</client>";
				}
			echo "</clients>";
			echo "<scitosNote>".""."</scitosNote>\n";
			/*if ($fileReadError) {
				echo "<error>file read error</error>\n";
			}*/
		echo "</formatname>";
	//<< answering -- END

