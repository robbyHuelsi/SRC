TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt
CONFIG += thread

SOURCES += main.cpp \
    joystick.cpp \
    udpclient.cpp

include(deployment.pri)
qtcAddDeployment()

HEADERS += \
    udpclient.h \
    joystick.h

