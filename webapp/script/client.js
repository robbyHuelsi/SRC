var posX100 = 0;
var posY100 = 0;

var repeatTime = 2000;
var repeat = true;

var reqAnswer = false;

var lastRequest, lastJoystickSent;

var verificationKey, scitosName, scitosÍP, scitosPort, serverPort, serverPath;

var notiCount = 0;

function loadClient(getKey, getScitosName, getScitosIP, getScitosPort, getServerPort, getServerPath){
	verificationKey = getKey;
	scitosName = getScitosName;
	scitosIP = getScitosIP;
	scitosPort = getScitosPort;

	serverPort = getServerPort;
	serverPath = getServerPath;
	//alert(GetComputerName());
	repeatRequest();
};

$(function() {
    $( "#joystick" ).draggable({
    	containment: "parent",

    	drag: function(){
            var offset = $(this).offset();
            joystickChange(offset.left, offset.top);
        },

        stop: function() {
        	joystickChange(0, 0);
        }
    });
});

function getComputerName(){

        //var network = new ActiveXObject('WScript.Network');
        // Show a pop up if it works
        //return network.computerName;
        return "computerName";
}

function joystickChange(posX, posY){

	if (posX == 0 && posY == 0) {
		posX100 = 0;
		posY100 = 0;

		document.getElementById("infoMouseX").value = 0;
    	document.getElementById("infoMouseY").value = 0;
    	document.getElementById("joystick").style.left = "";
    	document.getElementById("joystick").style.top = "";
    }else{
    	posX100 = Math.round((posX - $(joystickWrapper).offset().left - 2 - $(joystickWrapper).width()/2 +25) / ($(joystickWrapper).width()/2 - 25) * 100);
		posY100 = Math.round(-(posY - $(joystickWrapper).offset().top - 2 - $(joystickWrapper).height()/2 + 25) / ($(joystickWrapper).height()/2 - 25) * 100);

    	document.getElementById("infoMouseX").value = (posX100);
    	document.getElementById("infoMouseY").value = (posY100);
    };

    if ((Date.now() - lastJoystickSent) > 249) {
    	//setRequest("CONTROL",posX100, posY100);
    };

    lastJoystickSent = Date.now();
};



function joystickPos(e) {
	if(!e) e = window.event;
	var body = (window.document.compatMode && window.document.compatMode == "CSS1Compat") ? window.document.documentElement : window.document.body;

	var nullPosX, nullPosY, tmpTop, tmpLeft, posX, posY;

	//console.log("NullPosX: " + nullPosX);
	//console.log("NullPosY: " + nullPosY);

	tmpTop = e.pageY ? e.pageY - document.getElementById("joystickWrapper").offsetTop - 25 : e.clientY + body.scrollTop - body.clientTop - document.getElementById("joystickWrapper").offsetTop - 25;
	tmpLeft = e.pageX ? e.pageX - document.getElementById("joystickWrapper").offsetLeft - 25 : e.clientX + body.scrollLeft  - body.clientLeft - document.getElementById("joystickWrapper").offsetLeft - 25;

	if (tmpTop < 0) {
		tmpTop = 0;
	}else if (tmpTop > document.getElementById("joystickWrapper").offsetHeight - document.getElementById("joystick").offsetHeight - 4) {
		tmpTop = document.getElementById("joystickWrapper").offsetHeight - document.getElementById("joystick").offsetHeight - 4;
	};

	if (tmpLeft < 0) {
		tmpLeft = 0;
	}else if (tmpLeft >= (document.getElementById("joystickWrapper").offsetWidth - document.getElementById("joystick").offsetWidth - 4)) {
		tmpLeft = (document.getElementById("joystickWrapper").offsetWidth - document.getElementById("joystick").offsetWidth - 4);
	};


	nullPosX = (document.getElementById("joystickWrapper").offsetWidth - 50 - 4) / 2;
	nullPosY = (document.getElementById("joystickWrapper").offsetTop - 50 - 6) / 2;

	posX = (tmpLeft - nullPosX)/(document.getElementById("joystickWrapper").offsetWidth - 50 - 4)*2;
	posY = (nullPosY - tmpTop)/(document.getElementById("joystickWrapper").offsetHeight - 50 - 6)*2;

	if (posX < -1) {
		posX = -1;
	}else if (posX > 1) {
		posX = 1;
	};

	if (posY < -1) {
		posY = -1;
	}else if (posY > 1) {
		posY = 1;
	};

	return {
		top: tmpTop,
		left: tmpLeft,
		x: posX,
		y: posY
	};

}


function repeatRequest(){
	if (repeat) {
		setRequest((reqAnswer ? reqAnswer.status.detail : "FALSE"), posX100, posY100);
		setTimeout(function() {
			repeatRequest();
		}, (repeatTime > 0 ? repeatTime : 100));
	};
}


var request = false;

// Request senden
function setRequest(status, MouseX, MouseY) {
	lastRequest = Date.now();

	// Request erzeugen
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest(); // Mozilla, Safari, Opera
	} else if (window.ActiveXObject) {
		try {
			request = new ActiveXObject('Msxml2.XMLHTTP'); // IE 5
		} catch (e) {
			try {
				request = new ActiveXObject('Microsoft.XMLHTTP'); // IE 6
			} catch (e) {}
		}
	}

	// überprüfen, ob Request erzeugt wurde
	if (!request) {
		notification("Kann keine XMLHTTP-Instanz erzeugen","","warning");
		return false;
	} else {
		var url = "sci.php";
		// Request öffnen
		request.open('post', url, true);
		// Requestheader senden
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// Request senden
		request.send('key='+verificationKey+'&time='+lastRequest+'&scitosIP='+scitosIP+'&scitosPort='+scitosPort+'&serverPort='+serverPort+'&serverPath='+serverPath+'&name='+getComputerName()+'&status='+status+'&x='+MouseX+'&y='+MouseY);
		// Request auswerten
		request.onreadystatechange = interpretRequest;
	}
}

// Request auswerten
function interpretRequest() {
	switch (request.readyState) {
		// wenn der readyState 4 und der request.status 200 ist, dann ist alles korrekt gelaufen
		case 4:
			if (request.status != 200) {
				notification("Der Request wurde abgeschlossen, ist aber nicht OK", "Fehler-Code: "+request.status, "warning");
				repeatTime = 3000;
			} else {
				var xmlDoc = request.responseXML;
				console.log(request.responseText,"","");
				reqAnswer = {
					status : {
						access : (xmlDoc.getElementsByTagName("status")[0].getElementsByTagName("access")[0].firstChild ? xmlDoc.getElementsByTagName("status")[0].getElementsByTagName("access")[0].firstChild.nodeValue : ""),
						detail : (xmlDoc.getElementsByTagName("status")[0].getElementsByTagName("detail")[0].firstChild ? xmlDoc.getElementsByTagName("status")[0].getElementsByTagName("detail")[0].firstChild.nodeValue : "")
					},
					time : (xmlDoc.getElementsByTagName("time")[0].firstChild ? xmlDoc.getElementsByTagName("time")[0].firstChild.nodeValue : ""),
					queue : {
						position : (xmlDoc.getElementsByTagName("queue")[0].getElementsByTagName("position")[0].firstChild ? xmlDoc.getElementsByTagName("queue")[0].getElementsByTagName("position")[0].firstChild.nodeValue : ""),
						length : (xmlDoc.getElementsByTagName("queue")[0].getElementsByTagName("length")[0].firstChild ? xmlDoc.getElementsByTagName("queue")[0].getElementsByTagName("length")[0].firstChild.nodeValue : "")
					},
					scitosNote : (xmlDoc.getElementsByTagName("scitosNote")[0].firstChild ? xmlDoc.getElementsByTagName("scitosNote")[0].firstChild.nodeValue : "")
				};

				if (reqAnswer.status.access == 0) {
					document.getElementById("wrapper").style.display =  "none";
					//document.getElementById("wrapper").innerHTML =  "";
					document.getElementById("invalidMessage").style.display =  "block";

					if (reqAnswer.status.detail == "NOIP") {
						document.getElementById("invalidMessage").innerHTML = "<h1>Your IP address can't detected!</h1><p>Use another browser.</p>";
						repeat = false;

					}else if (reqAnswer.status.detail == "NOKEY") {
						document.getElementById("invalidMessage").innerHTML = "<h1>No key!</h1><p>Scan QR code on the screen of " + scitosName + " with your mobile device to become access!</p>";
						repeat = false;

					}else if (reqAnswer.status.detail == "KEYNOTFOUND") {
						document.getElementById("invalidMessage").innerHTML = "<h1>Your key is incorrect!</h1><p>Scan QR code on the screen of " + scitosName + " with your mobile device to become access!</p>";
						repeat = false;

					}else if (reqAnswer.status.detail == "WRONGKEY") {
						document.getElementById("invalidMessage").innerHTML = "<h1>Another device use this key!</h1><p>Scan QR code on the screen of " + scitosName + " with your mobile device to become access!</p>";
						repeat = false;

					}else if (reqAnswer.status.detail == "ABORT") {
						document.getElementById("invalidMessage").innerHTML = "<h1>Bye!</h1><p>If you want to control " + scitosName +" again, scan the QR code!</p>";
						repeat = false;

					}else if (reqAnswer.status.detail == "QUEUE") {
						if (reqAnswer.queue.position == 1) {
							document.getElementById("invalidMessage").innerHTML = "<h1>Wait your turn!</h1><p>You are next.</p><p>Last check: " + reqAnswer.time + "</p>";
						}else{
							document.getElementById("invalidMessage").innerHTML = "<h1>Wait your turn!</h1><p>Your position is Number " + (+reqAnswer.queue.position + 1) + " of " + reqAnswer.queue.length + ".</p><p>Last check: " + reqAnswer.time + "</p>";
						};
						repeatTime = 5000 * +reqAnswer.queue.position;
					};
				

				}else{
					document.getElementById("wrapper").style.display =  "block";
					document.getElementById("invalidMessage").style.display =  "none";
					document.getElementById("infoAjaxRequest").value =  reqAnswer.time;
					document.getElementById("infoAjaxDur").value =  (Date.now() - lastRequest) + " ms";

					if (reqAnswer.status.detail == "IPEXISTS") {
						notification("Welcome back!", "You come back with a new key.", "welcome");

					}else if (reqAnswer.status.detail == "NEW") {
						notification("Welcome!", "Control " + scitosName + " with your smartphone:", "welcome");

					}else if (reqAnswer.status.detail == "WAITEND"){
						notification("It's your turn!!", "Now you can control " + scitosName + ":", "control");
					};

					repeatTime = 500;

				};

				//console.log(reqAnswer);
			}
			break;
		default:
			break;
	}
}

window.onbeforeunload = function (event) {
	abortClient();

    /*var message = 'Please wait while disconnect from ' + scitosName + ' or click \'abort\'.';
    if (typeof event == 'undefined') {
        event = window.event;
    }
    if (event) {
        event.returnValue = message;
    }

    return message;*/
};

//window.onbeforeunload = abortClient();

function abortClient(){
	repeat = false;
	setRequest("ABORT",0,0);
}
