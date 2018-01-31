const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

board.on('ready', () => {

  var thermometer = new five.Thermometer({
      controller: "DHT11",
      pin: "GPIO1"
    });
    while(true){
      console.log(thermometer.celsius + "°C");
    }

    thermometer.on("change", function() {
      console.log(this.celsius + "°C");
      // console.log("0x" + this.address.toString(16));
    });

});