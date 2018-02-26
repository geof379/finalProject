#finalProject

##Prerequisites
###Setup raspberry pi
####Install os
    https://sourceforge.net/projects/win32diskimager/
    https://www.raspberrypi.org/
    http://www.advanced-ip-scanner.com/fr/
    https://mobaxterm.mobatek.net/download.html
####Config raspberry 
    sudo raspi-config
####Update all packages
    sudo rpi-update
####Update Os
    sudo apt-get update
    sudo apt-get -y upgrade
    sudo apt-get -y autoremove
####Active Bluetooth
    sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
###Install favorite editor
###Install libraries and tools
####Install git
    sudo apt-get install git 
####Update node
    update-nodejs-and-nodered --g
####install node-red global package
     sudo npm install crc --g
####install node-red based64
     sudo npm install node-red-node-base64 --g
####install node-red 
     sudo npm install -g node-red
####install node-red senseHat Simulator
     npm install node-red-node-pi-sense-hat-simulator
####Install firebase
    sudo npm install firebase --g
####Install onoff
    sudo npm install onoff --g
####Install johnny-five
    sudo npm install johnny-five --g
####Install raspi-io
    sudo npm install raspi-io --g
####Install mqtt
    http://www.airspayce.com/mikem/bcm2835/
    sudo npm install mqtt --g
##Projets
###Blinking LED

