// app/controllers/pumpHardware.js

var board, pump0, pump1, pump2, pump3, pump4, pump5;

var barReady = false;
/*
var five = require('johnny-five');
board = new five.Board('COM5');

board.on('ready', function () {

	pump0 = new five.Led(2);
	pump1 = new five.Led(3);
	pump2 = new five.Led(4);
	pump3 = new five.Led(5);
	pump4 = new five.Led(6);
	pump5 = new five.Led(7);

	board.repl.inject({
		p0: pump0,
		p1: pump1,
		p2: pump2,
		p3: pump3,
		p4: pump4,
		p5: pump5
	});
	console.log("[BARBOT] Barbot ready!");
	barReady = true;
});
*/


exports.pumpMilliseconds = function (pumptime) {
  console.log("[PUMP] Scheduling pump " + pumptime.pump + " duration: " + pumptime.time + "ms");
  exports.startPump(pumptime.pump);
  setTimeout(function () {
    exports.stopPump(pumptime.pump);
  }, pumptime.time);
}

exports.startPump = function (pump) {
  var p = exports.usePump(pump);
  if (p != undefined && barReady) {
	p.on();
	console.log("[PUMP] Starting pump " + pump);
  } else {
	console.log("[PUMP] Unable to start pump " + pump);
  }
}

exports.stopPump = function (pump) {
  var p = exports.usePump(pump);
  if (p != undefined && barReady) {
	p.off();
	console.log("[PUMP] Stopping pump " + pump);
  } else {
	console.log("[PUMP] Unable to stop pump " + pump);
  }
}

exports.usePump = function (pump) {
  var using;
  switch(pump) {
    case 0:
      using = pump0;
      break;
    case 1:
      using = pump1;
      break;
    case 2:
      using = pump2;
      break;
    case 3:
      using = pump3;
      break;
    case 4:
      using = pump4;
      break;
    case 5:
        using = pump5;
        break;
    default:
      using = null;
      break;
  }
  return using;
}