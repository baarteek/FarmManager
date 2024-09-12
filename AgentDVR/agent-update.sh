﻿#!/bin/bash

isOSX=0
if [[ ("$OSTYPE" == "darwin"*) ]]; then
	isOSX=1
fi

svc=0

if [ $isOSX -eq 1 ]; then
	launchctl list "com.ispy.agent.dvr"
	if [ $? -eq 0 ]; then
		echo "Service found"
		svc=0
	else
		echo "Service not found"
		svc=1
	fi
else
	if [ "$(systemctl list-units --all -t service --full --no-legend "AgentDVR.service" | sed 's/^\s*//g' | cut -f1 -d' ')" = "AgentDVR.service" ]; then
		svc=0
		echo "Service found"
	else
		svc=1
		echo "Service not found"
	fi
fi

apt-get update && apt-get install -y unzip 

if [ "$1" == "-update" ]; then
	if [ -f AgentDVR.zip ]; then
		echo "Installing update"
		unzip -o AgentDVR.zip
		rm -f AgentDVR.zip

		chmod +x Agent
		find . -name "*.sh" -exec chmod +x {} \;
	else
		echo "Update file not found. Use the web portal to update Agent"
	fi
fi

if [ "$1" == "-plugins" ]; then 
	echo "Installing $2"
	cd Plugins
	cd "$2"
	if [ -f plugin.zip ]; then
		unzip -o plugin.zip
		echo "Unzipped";
		rm -f plugin.zip
		echo "Removed archive";
		cd ..
	fi
	cd ..
fi

echo "Restarting Agent"
./Agent
