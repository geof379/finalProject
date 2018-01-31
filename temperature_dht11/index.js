var sensorLib = require("node-dht-sensor");
var mqtt = require('mqtt');

console.log('Connecting to: %s using access token: %s', 'demo.thingsboard.io', '8v9od7LSarjmlorE9J4Y');

var client  = mqtt.connect('mqtt://'+ 'demo.thingsboard.io',{
   username: '8v9od7LSarjmlorE9J4Y'
});

var sensor_data = [];
var sensor = {
    sensors: [ {
        name: "DHT11",
        type: 11,
        pin: 18
    } ],

};

client.on('connect', function () {
    console.log('Client connected!');


        for (var a in sensor.sensors) {
            var b = sensorLib.read(sensor.sensors[a].type, sensor.sensors[a].pin);
            sensor_data['temperature'] = b.temperature.toFixed(2);
            sensor_data['humidity'] = b.humidity.toFixed(2);
            console.log(sensor_data);
            client.publish('v1/devices/me/attributes', JSON.stringify(sensor_data));
            client.publish('v1/devices/me/telemetry',JSON.stringify(sensor_data),1);
            console.log('Data published!');
        }




    client.end();
});