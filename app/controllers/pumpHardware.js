// app/controllers/pumpHardware.js

var board, pump0, pump1, pump2, pump3, pump4, pump5;

var barReady = false;

var minPumpDelay = 30;
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

var lastStart = new Date();

canStartNewPump = function(resetTimer){
	var timeDiff = new Date() - lastStart;
	
	if(timeDiff >= 30) {
		if(resetTimer){
			lastStart = new Date();
		}
		return true;
	} else {
		return false;
	}

}


exports.pumpMilliseconds = function (pump, ms) {
	if(ms <= 0){
		return;
	}
	if(canStartNewPump(false)){
		console.log("[PUMP] Scheduling pump " + pump + " duration: " + ms + "ms");
		exports.startPump(pump);
		setTimeout(function () {
			exports.stopPump(pump);
		}, ms);
	}else {
		setTimeout(function () {
			exports.pumpMilliseconds(pump, ms);
		}, 10);
	}
}

exports.startPump = function (pump) {
	var p = exports.usePump(pump);
	if (p != undefined && barReady) {
		if(canStartNewPump(true)){
			p.on();
			console.log("[PUMP] Starting pump " + pump);
		}else {
			setTimeout(function () {
				startPump(pump);
			}, 10);
		}
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

delayedPumpMilliseconds = function (pump, ms, delay) {
	setTimeout(function () {
		exports.pumpMilliseconds(pump, ms);
	}, delay);
}

exports.dispenseDrink = function (name, instructions) {
  console.log("[PUMP] Dispensing drink: " + name);
  instructions = instructions.sort(function(a, b) {
                return (b['order'] < a['order']) ? 1 : ((b['order'] > a['order']) ? -1 : 0);
        });
        currentStep = -10000;
        var orderSteps = []
        for(var inst in instructions){
            if(currentStep < instructions[inst].order){
                currentStep = instructions[inst].order
                //orderSteps.push(currentStep);
                orderSteps[currentStep] = {};
                orderSteps[currentStep].maxLength = 0;
                orderSteps[currentStep].steps = []
            }
            if(instructions[inst].time + instructions[inst].startdelay > orderSteps[currentStep].maxLength
            && instructions[inst].pump >= 0)
                orderSteps[currentStep].maxLength = instructions[inst].time + instructions[inst].startdelay;
            orderSteps[currentStep].steps.push(instructions[inst]);
        }

        var totalDelay = 0;
        var prevDelay = -5;
        for (var step in orderSteps) {
            var noPumpsStarted = true;
            for (var ing in orderSteps[step].steps) {
                var startDelay = (orderSteps[step].maxLength - orderSteps[step].steps[ing].time) + totalDelay;
                if(orderSteps[step].steps[ing].pump >= 0){
					delayedPumpMilliseconds(orderSteps[step].steps[ing].pump, orderSteps[step].steps[ing].time, startDelay);
                    noPumpsStarted = false;
                }
            }
            if(!noPumpsStarted){
                totalDelay += orderSteps[step].maxLength;
            }
        }
}