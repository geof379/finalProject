var five = require("johnny-five");
//var Raspi = require('raspi-io');
var PiIO = require('pi-io');
var board = new five.Board({
  io: new PiIO()
});

board.on("ready", function() {
  // This requires OneWire support using the ConfigurableFirmata
  var thermometer = new five.Thermometer({
    controller: "DS18B20",
    pin: "GPIO17"
  });
  while(true){
    console.log(thermometer.celsius + "°C");
  }

  thermometer.on("change", function() {
    console.log(this.celsius + "°C");
    // console.log("0x" + this.address.toString(16));
  });
});