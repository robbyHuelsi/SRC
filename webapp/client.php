<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="utf-8">
        <meta content='width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;' name='viewport' />
        <meta name="viewport" content="width=device-width" />

        <link rel="stylesheet" href="style/client.css">

        <!--iPhone
        <link rel="apple-touch-icon" href="/custom_icon.png">
        <meta name="apple-mobile-web-app-capable" content="yes">-->

        <script language="javascript" type="text/javascript" src="script/jquery-1.7.2.min.js"></script>
        <script language="javascript" type="text/javascript" src="script/jquery-ui.min.js"></script>        
        <script language="javascript" type="text/javascript" src="script/touch-punch.js"></script>
        <script language="javascript" type="text/javascript" src="script/client.js"></script>

        <title>Remote</title>
    </head>

    <body>
        
            <?php
                $key = 0;
                if (!empty($_GET['key'])) {
                    $key = $_GET['key'];
                }

                if ($key) {
                   ?>
                   <div id="wrapper">
                        <table id="info">
                            <tr>
                                <td style="display: none;">Verification Key:</td>
                                <td style="display: none;"><input type="text" id="verificationKey" size="10" value="<?php echo $key; ?>"></td>
                                <td style="display: none;"></td>
                                <td>X:</td>
                                <td><input type="text" id="infoMouseX" size="3" disabled="disabled"></td>
                                <td></td>
                                <td>Y:</td>
                                <td><input type="text" id="infoMouseY" size="3" disabled="disabled"></td>
                                <td></td>
                                <td>Last request:</td>
                                <td><input type="text" id="infoAjaxRequest" size="10" disabled="disabled"></td>
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
                            <h1>Welcome to Leonie access client site!</h1>
                            <p>Scan QR code on Leonies screen with your mobile device to become access!</p>
                        </header>

                    <?php
                }
            ?>
             
  	
            <header id="KeyInvalidMessage">
                <h1>Your Key is not valid!</h1>
                <p>Scan QR code on Leonies screen with your mobile device to become access!</p>
            </header>
        
    </body>
    <script type="text/javascript">
        setRequest(0, 0); //Damit die Elemente verschwinden, wenn Key ungültig!
        </script>
</html>