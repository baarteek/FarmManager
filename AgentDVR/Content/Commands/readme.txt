To add your own commands to the list create a new file in the Commands directory

You can execute internal commands by adding a new .bat file and adding a remark at the top of the file. For example to switch all internal cameras off and start recording all external cameras you could do:


REM ispy-internal
switchon&group=external
switchoff&group=internal
RECORD
BROADCAST 'external cameras are on and recording'

(This uses groups - so you'd need to setup your internal/ external cameras with group names on the general tab when you edit them )

list of available commands:

allon
alloff
applyschedule
stopclouduploads
recordondetecton
recordonalerton
recordingoff
record
recordstop
alerton
alertoff
snapshot
alert
switchon
switchoff

more: https://www.ispyconnect.com/docs/agent/api


You can use these commands on their own, with a group or by passing in an object type and and object id:

-- specify ot=2 for a camera or ot=1 for a microphone and pass in an object id - you can find the object id (oid) on the server object list on the web portal (second column).
switchon&ot=2&oid=1 

-- specify a group name
switchon&group=garage

-- apply to all objects
switchon

To run an executable file say to open a garage door or something you'd leave off the REM ispy-internal command and just create a regular .bat (or .sh on linux/ osx) file like

start "c:\program files\acme garage door" opensesame.exe

