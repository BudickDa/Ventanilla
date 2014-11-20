Ventanilla – Eine Software zur Vernetzung von Aktoren und Sensoren
===============================================

Überblick über Ventanilla => http://budick.eu/#ventanilla

Präsentation auf Deutsch => http://budick.eu/slideshows/ventanilla#/

Installation
========
1. clone Project and go into directory
2. execute startWindows.cmd or startLinux.sh
3. open Browser and go to localhost:3000/backend
4. Profit!!!

Overview
========

Ventanilla is a framework that connects sensors and actors with modern web technology. 
In the back end UI, the user can program a logic with flow optimized programming. They can create a front end omit comma which gives him or other users the opportunity to send orders to actors or read sensor data.

This logic is created by linking boxes (LaVIEW-Style) and then submitted to the node.js webserver as JavaScript source code. 
On the hardware side, there are sensors connected to an Arduino-board. The data is transmitted to the webserver via USB. The server then processes the data.
Via omision socket.io technology, the data gets pushed in real time into the browser and shown on the user interface or the other way around; the user can manipulate actors from the front end.

Ventanilla brings everything that one needs for creating an intelligent home. An intelligent home is nothing other than sensors and actors communicating over an encrypted connection dictated by programmed logic.

The biggest advantage is the usability for users without any programming knowledge. Flow optimized programming can be used intuitively. Every sensor and actor is a block that has input and output ports. One can connect these ports graphically. In between, there can be logic, mathematics or windows for the front end ui as blocks. When all the blocks are connected, a new application is created. No coding necessary.

Another advantage is the portability. For using Ventanilla, one only needs a browser and node.js. Thus, it is possible to use on every operating system. The webserver can be outsourced to a Raspberry Pie Computer and accessed via smart-phone. There is no limit.

The third pro is scalability. The processing can be divided into as many webservers as needed.
Complex tasks can be processed in the cloud or on a powerful machine far away, while easy time-critical tasks, for example, collision detection, are processed on a small laptop in the same room.

The last point is C++. In node.js one can import modules written in C++. Thus, a whole new world of possibilities arises. Mathematically difficult operation can be quickly solved by C++-modules, specially tailored to special use-cases (e.g. calculating prime numbers, image processing, etc.).



