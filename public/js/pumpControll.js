	var socket = io.connect();
		
	startPumpTimed = function (index, ms, delay) {
		setTimeout(function () {
			socket.emit('Pump Ms', {pump:index, time:ms});
		},delay);
    }

	startPump = function (index) {
      socket.emit('Start Pump', index);
    }

    stopPump = function (index) {
      socket.emit('Stop Pump', index);
    }