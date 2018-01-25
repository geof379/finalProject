var five = require("johnny-five");
var Raspi = require('raspi-io');
var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  // This requires OneWire support using the ConfigurableFirmata
  var thermometer = new five.Thermometer("P1-4");

  thermometer.on("change", function() {
    console.log(this.celsius + "°C");
    // console.log("0x" + this.address.toString(16));
  });
});