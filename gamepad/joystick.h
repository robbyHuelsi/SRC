#include <stdio.h>
#ifndef __JOYSTICK_H__
#define __JOYSTICK_H__

#define JOYSTICK_DEVNAME "/dev/input/js4"

#define JS_EVENT_BUTTON         0x01    /* button pressed/released */
#define JS_EVENT_AXIS           0x02    /* joystick moved */
#define JS_EVENT_INIT           0x80    /* initial state of device */


struct js_event {
unsigned int time;      /* event timestamp in milliseconds */
short value;   /* value */
unsigned char type;     /* event type */
unsigned char number;   /* axis/button number */
};

struct wwvi_js_event {
 int button[11];
 int stick1_x;
 int stick1_y;
 int stick2_x;
 int stick2_y;
};

extern int openJoystick();
extern int readJoystickEvent(struct js_event *jse);
extern void setJoystick_y_axis(int axis);
extern void setJoystick_x_axis(int axis);
extern void closeJoystick();
extern int getJoystick_status(struct wwvi_js_event *wjse);

#endif
