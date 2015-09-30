var request = false;
var scitosName, port, path;

var reqAnswer;

var showInfo = false;


function loadServer(getScitosName, getPort, getPath){
	scitosName = getScitosName;
	port = getPort;
	path = getPath;
	repeatRequest();

};

function repeatRequest(){
	keyRequest(-1);
	setTimeout(function() {
		repeatRequest();
	}, 3000);
}

// Request senden
function keyRequest(command) {
	newKey = false;
	removeClient = "";

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

	if (reqAnswer) {
		if (command == reqAnswer.clients.length) {
			newKey = true;
		}else if (command >= 0){
			removeClient = reqAnswer.clients[command].ip;
		};
	};

	// überprüfen, ob Request erzeugt wurde
	if (!request) {
		notification("Kann keine XMLHTTP-Instanz erzeugen","","warning");
		return false;
	} else {
		var url = "key.php";
		// Request öffnen
		request.open('post', url, true);
		// Requestheader senden
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// Request senden
		request.send('newKey='+newKey+'&removeClient='+removeClient+'&port='+port+'&path='+path);
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
			} else {
				var xmlDoc = request.responseXML;
				//console.log(request.responseText);
				reqAnswer = {
					rcurl : (xmlDoc.getElementsByTagName("rcurl")[0].firstChild ? xmlDoc.getElementsByTagName("rcurl")[0].firstChild.nodeValue : ""),
					newUrl : (xmlDoc.getElementsByTagName("newUrl")[0].firstChild ? xmlDoc.getElementsByTagName("newUrl")[0].firstChild.nodeValue : ""),
					clients : [],
					scitosNote : (xmlDoc.getElementsByTagName("scitosNote")[0].firstChild ? xmlDoc.getElementsByTagName("scitosNote")[0].firstChild.nodeValue : "")
				};

				var clients = xmlDoc.getElementsByTagName("client");
				var client;

				for (var i = 0; i < clients.length; i++) {
					client = {
						name: (clients[i].getElementsByTagName("name")[0].firstChild ? clients[i].getElementsByTagName("name")[0].firstChild.nodeValue : ""),
						ip: (clients[i].getElementsByTagName("ip")[0].firstChild ? clients[i].getElementsByTagName("ip")[0].firstChild.nodeValue : ""),
						key: (clients[i].getElementsByTagName("key")[0].firstChild ? clients[i].getElementsByTagName("key")[0].firstChild.nodeValue : "")
					};
					reqAnswer.clients.push(client);
				};

				//console.log(reqAnswer.clients);

				if (reqAnswer.newUrl == "true") {
					var qrImgDiv = document.getElementById("qrImgDiv");
					//qrImgDiv.style.opacity = "0";
					setTimeout(function() {
						qrImgDiv.style.backgroundImage = "url(urlQr.png?" + Date.now() + ")";
						//qrImgDiv.style.opacity = "1";
					}, 500);
					//document.getElementById("url").innerHTML = "<a href='" + reqAnswer.rcurl + "'></a>";
				};


				var tbody = "";
				for (var i = 0; i < reqAnswer.clients.length; i++) {
					if (reqAnswer.clients[i].ip == "0.0.0.0") {
						var url = '"' + reqAnswer.rcurl + '"'
						tbody += "<tr>"
						tbody += "<td class='tdIcon'><i class='fa fa-user-plus'></i></td>";
						tbody += "<td>New key</td>"; 
						tbody += (reqAnswer.rcurl == "" ? "<td></td>" : "<td class='tdClick' onclick='openNewWindow(" + url + ");''><span>Get access</span></td>");
						tbody += "<td class='tdKey'>" + reqAnswer.clients[i].key + "</td>";
						tbody += "<td class='tdIcon tdClick' onclick='keyRequest(" + i + ");'><i class='fa fa-refresh'></i></td></tr>";
					}else{
						tbody += "<tr><td class='tdIcon'>" + (i == 0 ? "<i class='fa fa-gamepad'></i>" : "<i class='fa fa-hourglass'></i>") + "</td><td>" + reqAnswer.clients[i].name + "</td><td>" + reqAnswer.clients[i].ip + "</td><td class='tdKey'>" + reqAnswer.clients[i].key + "</td><td class='tdIcon tdClick' onclick='keyRequest(" + i + ");'><i class='fa fa-user-times'></i></td></tr>";
					};
				};
				//console.log(tbody);
				document.getElementById("clientsTable").getElementsByTagName("tbody")[0].innerHTML = tbody;
			
			};

			//console.log(xmlDoc.getElementsByTagName("clients"));
			break;
		default:
			break;
	}
};

function openNewWindow(url) {
    var rcWin = window.open(url,'rcWin','menubar=no, toolbar=no, location=no, directories=no, status=no, scrollbars, resizable, dependent, width=640, height=480');
};

function toggleInfo(){
	document.getElementById("tdQr").style.transition = "all 1s";
	document.getElementById("tdQr").style.webkitTransition = "all 1s";
	document.getElementById("tdQr").style.mozTransition = "all 1s";
	document.getElementById("tdQr").style.msTransition = "all 1s";

	document.getElementById("tdInfo").style.transition = "all 1s";
	document.getElementById("tdInfo").style.webkitTransition = "all 1s";
	document.getElementById("tdInfo").style.mozTransition = "all 1s";
	document.getElementById("tdInfo").style.msTransition = "all 1s";


	document.getElementById("qrImgDiv").style.transition = "all 1s";
	document.getElementById("qrImgDiv").style.webkitTransition = "all 1s";
	document.getElementById("qrImgDiv").style.mozTransition = "all 1s";
	document.getElementById("qrImgDiv").style.msTransition = "all 1s";


	if (showInfo) {
		document.getElementById("tdQr").style.width = "100%";
		document.getElementById("tdInfo").style.width = "0%";

		document.getElementById("qrImgDiv").style.width = "80vw";
		document.getElementById("qrImgDiv").style.height = "80vw";

		document.getElementById("clientsTable").style.opacity = "0";

		showInfo = false;
	}else{
		document.getElementById("tdQr").style.width = "50%";
		document.getElementById("tdInfo").style.width = "50%";

		document.getElementById("qrImgDiv").style.width = "50vw";
		document.getElementById("qrImgDiv").style.height = "50vw";

		document.getElementById("clientsTable").style.opacity = "1";

		showInfo = true;
	};


	setTimeout(function() {
		document.getElementById("tdQr").style.transition = "";
		document.getElementById("tdQr").style.webkitTransition = "";
		document.getElementById("tdQr").style.mozTransition = "";
		document.getElementById("tdQr").style.msTransition = "";

		document.getElementById("tdInfo").style.transition = "";
		document.getElementById("tdInfo").style.webkitTransition = "";
		document.getElementById("tdInfo").style.mozTransition = "";
		document.getElementById("tdInfo").style.msTransition = "";

		document.getElementById("qrImgDiv").style.transition = "";
		document.getElementById("qrImgDiv").style.webkitTransition = "";
		document.getElementById("qrImgDiv").style.mozTransition = "";
		document.getElementById("qrImgDiv").style.msTransition = "";
	}, 1000);
}

