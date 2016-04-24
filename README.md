BarBot

Description: Website for controlling a drink mixing robot.

Project Setup

The project is based on a Raspberry Pi using it's IO pins to controll the pumps of the machine

    All the depencenies for this project is in the package.json file and can be installed using Node Packet Manager(npm),
    Just run 'npm install' from the project folder and npm will take care of it.


Common tasks

  If you want to test the project locally without running it on a raspberry pi you have to comment out the pin IO logic,
  to do this you comment out from line 14 to line 44 in the \app\controllers\pumpHardware.js

  If you want to empty and rebuild the database with sample data on startup you can follow the comments around line 40 in the server.js file

License
  Some lisence?
