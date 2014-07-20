	var socket = io.connect();
		
	startPumpTimed = function (index, ms) {
	    socket.emit('Pump Ms', index, ms);
    }

	startPump = function (index) {
      socket.emit('Start Pump', index);
    }

    stopPump = function (index) {
      socket.emit('Stop Pump', index);
    }

    dispenseDrink = function (name, instructions) {
        socket.emit('Dispense drink', name, instructions);
    }