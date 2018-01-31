var sensorLib = require("node-dht-sensor");
var mqtt = require('mqtt');

console.log('Connecting to: %s using access token: %s', 'demo.thingsboard.io', 'DkiMfuhVrpaIWjdW5zbR');

var client  = mqtt.connect('mqtt://'+ 'demo.thingsboard.io',{
    username: 'DkiMfuhVrpaIWjdW5zbR'
});

var sensor_data;

client.on('connect', function () {
    console.log('Client connected!');

    var sensor = {
        sensors: [ {
            name: "DHT11",
            type: 11,
            pin: 18
        } ],
        read: function() {
            for (var a in this.sensors) {
                var b = sensorLib.read(this.sensors[a].type, this.sensors[a].pin);
                sensor_data['temperature'] = b.temperature.toFixed(2);
                sensor_data['humidity'] = b.humidity.toFixed(2);
                client.publish('v1/devices/me/telemetry', JSON.stringify(sensor_data));
                console.log('Data published!');
            }
            setTimeout(function() {
                sensor.read();
            }, 2000);
        }
    };

    client.end();
});


sensor.read();