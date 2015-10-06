/*
 * Copyright (C) 2012 by
 *   MetraLabs GmbH (MLAB), GERMANY
 * and
 *   Neuroinformatics and Cognitive Robotics Labs (NICR) at TU Ilmenau, GERMANY
 * All rights reserved.
 *
 * Contact: info@mira-project.org
 *
 * Commercial Usage:
 *   Licensees holding valid commercial licenses may use this file in
 *   accordance with the commercial license agreement provided with the
 *   software or, alternatively, in accordance with the terms contained in
 *   a written agreement between you and MLAB or NICR.
 *
 * GNU General Public License Usage:
 *   Alternatively, this file may be used under the terms of the GNU
 *   General Public License version 3.0 as published by the Free Software
 *   Foundation and appearing in the file LICENSE.GPL3 included in the
 *   packaging of this file. Please review the following information to
 *   ensure the GNU General Public License version 3.0 requirements will be
 *   met: http://www.gnu.org/copyleft/gpl.html.
 *   Alternatively you may (at your option) use any later version of the GNU
 *   General Public License if such license has been publicly approved by
 *   MLAB and NICR (or its successors, if any).
 *
 * IN NO EVENT SHALL "MLAB" OR "NICR" BE LIABLE TO ANY PARTY FOR DIRECT,
 * INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF
 * THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF "MLAB" OR
 * "NICR" HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * "MLAB" AND "NICR" SPECIFICALLY DISCLAIM ANY WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE. THE SOFTWARE PROVIDED HEREUNDER IS
 * ON AN "AS IS" BASIS, AND "MLAB" AND "NICR" HAVE NO OBLIGATION TO
 * PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS.
 */

/**
 * @file UDPMiraReceiver.CPP
 *    receive UDP commands
 *
 * @author Robert
 * @date   2015/08/27
 */

#include "udpclient.h"
#include <fw/Unit.h>
#include <string>
#include <sstream>

#include <transform/Velocity.h>

//Additionaly includes for getting IP
#include <cstdio>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/ioctl.h>
#include <netinet/in.h>
#include <net/if.h>
#include <arpa/inet.h>


#define BUFLEN 1024

using namespace mira;
using std::stringstream;
using std::cout;
using std::endl;
using std::string;
using namespace udp_client_server;

namespace udpmiradomain { 

///////////////////////////////////////////////////////////////////////////////

/**
 * receive UDP commands
 */
class UDPMiraReceiver : public Unit
{
MIRA_OBJECT(UDPMiraReceiver)

public:

	UDPMiraReceiver();

	template<typename Reflector>
	void reflect(Reflector& r)
	{
		Unit::reflect(r);

		// TODO: reflect all parameters (members and properties) that specify the persistent state of the unit
		//r.property("Param1", mParam1, "First parameter of this unit with default value", 123.4f);
		//r.member("Param2", mParam2, setter(&UnitName::setParam2,this), "Second parameter with setter");
	}

protected:

	virtual void initialize();

	virtual void process(const Timer& timer);

private:

	// void onPoseChanged(ChannelRead<Pose2> pose);

private:
	udp_server *server;
	//Channel<Img<>> mChannel;
};

///////////////////////////////////////////////////////////////////////////////

UDPMiraReceiver::UDPMiraReceiver() : Unit(Duration::milliseconds(500))
{
	// TODO: further initialization of members, etc.
}

void UDPMiraReceiver::initialize()
{
	// TODO: subscribe and publish all required channels
	//subscribe<Pose2>("Pose", &UnitName::onPoseChanged);
	//mChannel = publish<Img<>>("Image");

	//Get IP address:
	int fd;
	 struct ifreq ifr;

	 fd = socket(AF_INET, SOCK_DGRAM, 0);

	 /* I want to get an IPv4 IP address */
	 ifr.ifr_addr.sa_family = AF_INET;

	 /* I want IP address attached to "wlan0" */
	 strncpy(ifr.ifr_name, "wlan0", IFNAMSIZ-1);

	 ioctl(fd, SIOCGIFADDR, &ifr);

	 close(fd);

	 string ip = inet_ntoa(((struct sockaddr_in *)&ifr.ifr_addr)->sin_addr);
	 cout << "IP adress of wlan0 is " << ip << ". Listening to port 8888." << endl;


	server = new udp_server(ip, 8888);
}

void UDPMiraReceiver::process(const Timer& timer)
{
	// TODO: this method is called periodically with the specified cycle time, so you can perform your computation here.
	
	char* msg = new char[BUFLEN];
	string line;

	string cmd;
	string cmds[2][5];

	int i = 0;
	int pos = 0;
        int reset = 0;
        int emer;
	
	float dX, dY;

	Velocity2 vel;

	
        server->recv(msg, BUFLEN); //Beispiel: x=12 y=-100\0
	line = msg;
	cout << line << endl;

    	stringstream ssin(line);
   	while (ssin.good() && i < 5){
        	ssin >> cmd;
		pos = cmd.find('=');
		cmds[0][i] = cmd.substr(0,pos);
		cmds[1][i] = cmd.substr(pos+1,cmd.length());
		cout << cmds[0][i] << ": " << cmds[1][i] << ";" << endl;
        	++i;
    	}


    	for(i = 0; i < 5; i++){
		if (!cmds[0][i].compare("x")){
			dX = (float)atoi(cmds[1][i].c_str()) / 100;
			dX = dX * dX * dX;
		}else if(!cmds[0][i].compare("y")){
			dY = (float)atoi(cmds[1][i].c_str()) / 100;
			dY = dY * dY * dY;
                }else if(!cmds[0][i].compare("r")){
                    reset = (int)atoi(cmds[1][i].c_str());
                }else if(!cmds[0][i].compare("n")){
                    emer = (int)atoi(cmds[1][i].c_str());
                }
    	}

	cout << "x: " << dX << ";" << endl;
	cout << "y: " << dY << ";" << endl;
        cout << "r: " << reset << ";" << endl;
        cout << "n: " <<  emer << ";" << endl;

	vel = {dY, 0, -dX};	
        if (emer ==1){
            callService<void>("robot/Robot", "emergencyStop");
        }else{
	callService<void>("robot/Robot", "setVelocity", vel);
        if (reset==1) callService<void>("robot/Robot", "resetMotorStop");
        }


}

///////////////////////////////////////////////////////////////////////////////

}

MIRA_CLASS_SERIALIZATION(udpmiradomain::UDPMiraReceiver, mira::Unit );
