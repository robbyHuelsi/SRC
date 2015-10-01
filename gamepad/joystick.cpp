#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

#include "joystick.h"

static int joystick_fd = -1;

int openJoystick()
{
    joystick_fd = open(JOYSTICK_DEVNAME, O_RDONLY | O_NONBLOCK);
    if (joystick_fd < 0)
        return joystick_fd;



    return joystick_fd;
}

int readJoystickEvent(struct js_event *jse)
{
    int bytes;

    bytes = read(joystick_fd, jse, sizeof(*jse));

    if (bytes == -1)
        return 0;

    if (bytes == sizeof(*jse))
        return 1;

    printf("Unexpected bytes from joystick:%d\n", bytes);

    return -1;
}

void closeJoystick()
{
    close(joystick_fd);
}

int getJoystickStatus(struct wwvi_js_event *wjse)
{
    int rc;
    struct js_event jse;
    if (joystick_fd < 0)
        return -1;


    while ((rc = readJoystickEvent(&jse) == 1)) {
        jse.type &= ~JS_EVENT_INIT;
        if (jse.type == JS_EVENT_AXIS) {
            switch (jse.number) {
            case 0: wjse->stick1_x = jse.value;
                break;
            case 1: wjse->stick1_y = jse.value;
                break;
            case 2: wjse->stick2_x = jse.value;
                break;
            case 3: wjse->stick2_y = jse.value;
                break;
            default:
                break;
            }
        } else if (jse.type == JS_EVENT_BUTTON) {
            if (jse.number < 10) {
                switch (jse.value) {
                case 0:
                case 1: wjse->button[jse.number] = jse.value;
                    break;
                default:
                    break;
                }
            }
        }
    }

    return 0;
}
