'use strict';

var five = require('johnny-five');
var PiIO = require('pi-io');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var led = new five.Led('GPIO4');
  var button = new five.Button('GPIO17');

  button.on('down', function() {
    led.on();
  });

  button.on('up', function() {
    led.off();
  });
});
