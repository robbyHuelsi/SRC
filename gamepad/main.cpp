/*
 * main.cpp
 *
 *  Created on: Aug 27, 2015
 *      Author: Arni
 */
#include <stdio.h>
#include <string.h>
#include "joystick.h"
#include "udpclient.h"
#include <unistd.h>
#include <pthread.h>

#define BUFLEN 1024

char str[10]="0";
int timeraktiv = 1;
int aktiv = 0;

using namespace udp_client_server;

void *timer(void *a)
{
   udp_client client("134.103.108.15", 8888);  //134.103.120.168:888
    while (timeraktiv){
        while (aktiv) {
            client.send(str,BUFLEN);

             usleep(500*1000);
        }
  }
    return NULL;
}

int main(void)
{
    	int fd, rc;
    	int done = 0;
    	int achse_X=0;
    	int achse_Y=0;
        int reset = 0;
        int emer = 0;


        struct js_event jse;
        pthread_t p1;
        pthread_create(&p1, NULL, timer,&aktiv);

        fd = openJoystick();
        if (fd < 0) {
            printf("open failed.\n");
            done = 1;
        }

        while (!done) {
            rc = readJoystickEvent(&jse);

            if (rc == 1) {
                aktiv = 1;
                printf("Event: time %8u, value %8hd, type: %3u, axis/button: %u\n",
                    jse.time, jse.value, jse.type, jse.number);
                if (jse.type==2){
                	switch (jse.number){
                	case 2: achse_X = jse.value * 0.003051851;
                		break;
                    case 3: achse_Y = jse.value * -0.003051851;
                		break;
                	}
                }else if(jse.type==1){
                    switch (jse.number){
                    case 1: reset = jse.value;
                        break;
                    case 2: emer = jse.value;
                        break;
                    }
                }

                    sprintf(str, "x=%d y=%d r=%d n=%d",achse_X,achse_Y,reset,emer);
                    printf("%s \n",str);

                    //client.send(str,BUFLEN);



            }
        }
    return 0;
}




