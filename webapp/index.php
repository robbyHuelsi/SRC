<!DOCTYPE html>
<html lang="de">
<?php
	$settingsFile = "settings.txt";
	$sfh = fopen($settingsFile, 'r');
	if ($sfh) {
		while (($buffer = fgets($sfh, 4096)) !== false) {
			list($settingN[], $settingV[]) = split('[=;]', $buffer);
		}
		if (!feof($sfh)) {
			echo "Fehler!";
		}
		fclose($sfh);
	}
?>

    <head>
        <meta charset="utf-8">

        <link rel="stylesheet" href="style/server.css">
        <link rel="stylesheet" href="style/notification.css">
        <link rel="stylesheet" href="font-awesome-4-4-0/css/font-awesome.min.css">

        <script language="javascript" type="text/javascript" src="script/server.js"></script>
        <script language="javascript" type="text/javascript" src="script/notification.js"></script>

        <title><?php echo $settingV[array_search('scitosName', $settingN)]; ?> Remote Control Server</title>
    </head>

    <body onload="loadServer('<?php echo $settingV[array_search('scitosName', $settingN)]; ?>', '<?php echo $settingV[array_search('scitosIP', $settingN)]; ?>', '<?php echo $settingV[array_search('scitosPort', $settingN)]; ?>', '<?php echo $settingV[array_search('serverPort', $settingN)]; ?>', '<?php echo $settingV[array_search('serverPath', $settingN)]; ?>', '<?php echo $settingV[array_search('showHint', $settingN)]; ?>');">

    	<header>
    		<h1>Welcome to <?php echo $settingV[array_search('scitosName', $settingN)]; ?> access server!</h1>
    		<p>Open URL width your Smartphone by using the QR code:</p>
    	</header>
		
    	<table id="mainTable">
    		<td id="tdQr">
    			<div id='qrImgDiv' onclick="toggleInfo();"></div>		
    		</td>
    		<td id="tdInfo">
    			<div id="infoDiv">
					<table id="clientsTable">
					<caption>Clients:</caption>
    					<thead>
    						<td></td>
    						<td>Name</td>
    						<td>IP</td>
    						<td>Key</td>
    						<td></td>
    					</thead>
    					<tbody></tbody>
    				</table>
       			</div>
    		</td>
    	</table>

		

	</body>
</html>