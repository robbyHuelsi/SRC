<?php
	//Server-Client-Interface and UDP
		
	header('Content-Type: text/xml; charset=utf-8'); // sorgt für die korrekte Kodierung
	header('Cache-Control: must-revalidate, pre-check=0, no-store, no-cache, max-age=0, post-check=0'); // ist mal wieder wichtig wegen IE

	$ip = "";
	$userName;
	$queuePos = "";
	$queueLen = "";

	$changeFile = false;
	$reqCase = -1;


	$clientFile = "clients.txt";
	$logFile = "log.txt";

	//>> Try to get IP of client
		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
		    $ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else {
		    $ip = $_SERVER['REMOTE_ADDR'];
		}
	//<< getting IP -- END


	//>> Get more client info
		$keyClient = $_POST['key'];
		//if (gethostbyaddr($ip)) {
		$userName = "";
		//}
	//<< Client info -- END


	if (!$ip || $ip == "") {
		$reqCase = 0; //No IP

	}elseif ($keyClient == ""){
		$reqCase = 1; //No Key

	}else{ //Client sent nessesary datas so let check those!

		//>> Fill arrays with client entries
			$cfh = fopen($clientFile, 'r');
			if ($cfh) {
				while (($buffer = fgets($cfh, 4096)) !== false) {
					list($keys[], $ips[], $names[]) = split(',', $buffer);
				}
				if (!feof($cfh)) {
					answerRequest(false, "FAIL");
				}
				fclose($cfh);
			}
			$queueLen = count($keys);
		//<< Filling entries -- END

		if (in_array($keyClient, $keys) == FALSE) {
			$reqCase = 2; //Key not found in client list

		}else{
			$queuePos = array_search($keyClient, $keys);

			if ($ips[$queuePos] == "0.0.0.0") { //This key wasn't use before

				if (in_array($ip, $ips)) {
					//>> Client is registrated with other key(s), so delete all other keys
						for ($i=0; $i < count($ips); $i++) { 
							if ($ips[$i] == $ip) {
								unset($keys[$i]);
								unset($ips[$i]);
								unset($names[$i]);
							}
						}
						$keys = array_values($keys);
						$ips = array_values($ips);
						$names = array_values($names);
					//<< deleting other entries -- END

					//>> Refresh length and position of queue:
						$queuePos = array_search($keyClient, $keys);
						$queueLen = count($keys);
					//<< refreshment -- END

					$reqCase = 3; //Key found but IP already exits. Older keys deleted in array and will save below
				}else{
					
					$reqCase = 4; //Key found and IP will define below
				}

				$names[$queuePos] = $userName;
				$ips[$queuePos] = $ip;

				$changeFile = true;

			}elseif ($ips[$queuePos] != $ip) {
				$reqCase = 5; //Key found but wrong IP

			}elseif ($ips[$queuePos] == $ip) {
				$reqCase = 6; //Key found and IP right

			};

			if ($_POST['status'] == "ABORT" && $reqCase != 5){
				//>> Delete client bacause client aborts
					unset($keys[$queuePos]);
					unset($ips[$queuePos]);
					unset($names[$queuePos]);
					$keys = array_values($keys);
					$ips = array_values($ips);
					$names = array_values($names);
					$changeFile = true;
				//<< deleting -- END


				//>> Refresh length and position of queue
					$queuePos = array_search($keyClient, $keys);
					$queueLen = count($keys);
				//<< refreshment -- END

				$reqCase = 7; //User aborted control or jumped out of queue

			}elseif ($queuePos && $reqCase != 5) {
				$reqCase = 8; //Client have to wait for his turn

			}elseif ($_POST['status'] == "QUEUE" && ($reqCase == 3 || $reqCase == 4 || $reqCase == 6)) {
				$reqCase = 9; //Client have access for first time
			}
		} //Key found -- END

		//>> Change clients.txt if nessesary
			if ($changeFile) { 
				$cfh = fopen($clientFile, 'w');
				for ($i=0; $i < count($keys); $i++) {
					fwrite($cfh,$keys[$i].",".$ips[$i].",".$names[$i].",\n");
				}
				fclose($cfh);
			}
		//<< changing file -- END

	}//IP and key available -- END

	

	switch ($reqCase) {
		case 0:
			writeLog("NOIP");
			udp(0,0);
			answerRequest(false, "NOIP");

			break;
		case 1:
			writeLog("NOKEY");
			udp(0,0);
			answerRequest(false, "NOKEY");

			break;
		case 2:
			writeLog("KEYNOTFOUND");
			udp(0,0);
			answerRequest(false, "KEYNOTFOUND");

			break;
		case 3:
			writeLog("IPEXISTS");
			udp(0,0);
			answerRequest(true, "IPEXISTS");

			break;
		case 4:
			writeLog("NEW");
			udp($_POST['x'], $_POST['y']);
			answerRequest(true, "NEW");

			break;
		case 5:
			writeLog("WRONGKEY");
			udp(0,0);
			answerRequest(false, "WRONGKEY");

			break;
		case 6:
			writeLog("OKAY");
			udp($_POST['x'], $_POST['y']);
			answerRequest(true, "OKAY");

			break;
		case 7:
			writeLog("ABORT");
			udp(0,0);
			answerRequest(false, "ABORT");

			break;

		case 8:
			writeLog("QUEUE");
			udp(0,0);
			answerRequest(false, "QUEUE");

			break;
		case 9:
			writeLog("WAITEND");
			udp(0,0);
			answerRequest(true, "WAITEND");

			break;
		default:
			writeLog($reqCase);
			udp(0,0);
			answerRequest(false, "FAIL");
	}

	function udp($posX, $posY){

		$sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);

	    $msg = "x=".$posX." y=".$posY."\0";
	    $len = strlen($msg);

	    socket_sendto($sock, $msg, $len, 0, $_POST['scitosIP'], $_POST['scitosPort']);
	    socket_close($sock);
	}

	function writeLog($status){
		global $ip;

		$lfh = fopen($logFile, 'a');

		fwrite($lfh,date('Y-m-d H:i:s').": ");
		fwrite($lfh,"status=".$status."; ");
		fwrite($lfh,"key=". $_POST['key'] ."; ");
		fwrite($lfh,"ip=".$ip."; ");
		fwrite($lfh,"name=".$userName."; ");
		fwrite($lfh,"posX=".$_POST['x']."; ");
		fwrite($lfh,"posY=".$_POST['y']."; ");
		fwrite($lfh,"timeSent=".$_POST['time']."; ");
		fwrite($lfh,"abort=".$_POST['abort']."\n");

		fclose($lfh);
	}

	function answerRequest($access, $detail){
		global $queuePos, $queueLen;

		echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
		echo "<formatname>\n";
			echo "<status>";
				echo "<access>".($access ? 1 : 0)."</access>\n";
				echo "<detail>".$detail."</detail>\n";
			echo "</status>\n";
			echo "<time>".date('H:i:s')."</time>\n";
			echo "<queue>";
				echo "<position>".$queuePos."</position>\n";
				echo "<length>".$queueLen."</length>\n";
			echo "</queue>";
			echo "<scitosNote>".$_POST["scitosIP"].":".$_POST["scitosPort"]."</scitosNote>\n";
		echo "</formatname>";

	}

