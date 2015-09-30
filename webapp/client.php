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

    $key = 0;
    if (!empty($_GET['key'])) {
        $key = $_GET['key'];
    }
?>
    <head>
        <meta charset="utf-8">
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;' name='viewport' />
        <meta name="viewport" content="width=device-width" />

        <link rel="stylesheet" href="style/client.css">
        <link rel="stylesheet" href="style/notification.css">
        <link rel="stylesheet" href="font-awesome-4-4-0/css/font-awesome.min.css">

        <!--iPhone
        <link rel="apple-touch-icon" href="/custom_icon.png">
        <meta name="apple-mobile-web-app-capable" content="yes">-->

        <script language="javascript" type="text/javascript" src="script/jquery-1.7.2.min.js"></script>
        <script language="javascript" type="text/javascript" src="script/jquery-ui.min.js"></script>        
        <script language="javascript" type="text/javascript" src="script/touch-punch.js"></script>
        <script language="javascript" type="text/javascript" src="script/client.js"></script>
        <script language="javascript" type="text/javascript" src="script/notification.js"></script>

        <title><?php echo $settingV[array_search('scitosName', $settingN)]; ?> Remote Control</title>
    </head>

    <body onload="loadClient('<?php echo $key; ?>', '<?php echo $settingV[array_search('scitosName', $settingN)]; ?>', '<?php echo $settingV[array_search('port', $settingN)]; ?>', '<?php echo $settingV[array_search('path', $settingN)]; ?>');">
        
            <?php
                if ($key) {
                   ?>
                   <div id="wrapper">
                        <h1><?php echo $settingV[array_search('scitosName', $settingN)]; ?> Remote Control</h1>
                        <table id="info">
                            <tr>
                                <td class="tdRight">X:</td>
                                <td><input type="text" id="infoMouseX" size="3" disabled="disabled"></td>
                                <td></td>
                                <td class="tdRight">Y:</td>
                                <td><input type="text" id="infoMouseY" size="3" disabled="disabled"></td>
                                <td></td>
                                <td class="tdRight">Last request:</td>
                                <td><input type="text" id="infoAjaxRequest" size="10" disabled="disabled"></td>
                                <td></td>
                                <td class="tdRight">Duration:</td>
                                <td><input type="text" id="infoAjaxDur" size="5" disabled="disabled"></td>
                                <td></td>
                                <td><input type="button" value="Abort" id="abort" onclick="abortClient();"></td>
                            </tr>
                            <tr>
                        </table> 
                       <div id="joystickWrapper">
                            <div id="joystick"></div>
                        </div>
                    </div>
                   <?php
                }else{
                    ?>
                        <header>
                            <h1>Welcome to <?php echo $settingV[array_search('scitosName', $settingN)]; ?> access client site!</h1>
                            <p>Scan QR code on the screen of <?php echo $settingV[array_search('scitosName', $settingN)]; ?> with your mobile device to become access!</p>
                        </header>

                    <?php
                }
            ?>
             
  	
            <header id="invalidMessage">
                
            </header>
        
    </body>
</html>