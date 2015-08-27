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

/*object.onload=function(){
    setRequest(0, 0);
};*/

function joystickChange(posX, posY){

	if (posX == 0 && posY == 0) {
		document.getElementById("infoMouseX").value = 0;
    	document.getElementById("infoMouseY").value = 0;
    	document.getElementById("joystick").style.left = "";
    	document.getElementById("joystick").style.top = "";

    	setRequest(0, 0);
    }else{
    	var posX100, posY100;

		posX100 = Math.round((posX - $(joystickWrapper).offset().left - 2 - $(joystickWrapper).width()/2 +25) / ($(joystickWrapper).width()/2 - 25) * 100);
		posY100 = Math.round(-(posY - $(joystickWrapper).offset().top - 2 - $(joystickWrapper).height()/2 + 25) / ($(joystickWrapper).height()/2 - 25) * 100);

    	document.getElementById("infoMouseX").value = (posX100);
    	document.getElementById("infoMouseY").value = (posY100);

    	setRequest(posX100, posY100);
    };
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





//function sendJoystickPos(){
var request = false;

// Request senden
function setRequest(MouseX, MouseY) {
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
		alert("Kann keine XMLHTTP-Instanz erzeugen");
		return false;
	} else {
		var url = "receiver.php";
		// Request öffnen
		request.open('post', url, true);
		// Requestheader senden
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// Request senden
		request.send('key='+document.getElementById("verificationKey").value+'&x='+MouseX+'&y='+MouseY);
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
				alert("Der Request wurde abgeschlossen, ist aber nicht OK\nFehler:"+request.status);
			} else {
				var content = request.responseText;
				// den Inhalt des Requests in das <div> schreiben
				if (content == "FALSE") {
					document.getElementById("wrapper").style.display =  "none";
					document.getElementById("KeyInvalidMessage").style.display =  "block";
				}else{
					document.getElementById("wrapper").style.display =  "block";
					document.getElementById("infoAjaxRequest").value =  content;
				};
				
			}
			break;
		default:
			break;
	}
}
//}