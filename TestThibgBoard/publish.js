var mqtt = require('mqtt');

console.log('Connecting to: %s using access token: %s', process.env.THINGSBOARD_HOST, process.env.ACCESS_TOKEN);

var client  = mqtt.connect('mqtt://'+ 'demo.thingsboard.io',{
    username: 'DkiMfuhVrpaIWjdW5zbR'
});

client.on('connect', function () {
    console.log('Client connected!');
    client.publish('v1/devices/me/attributes', {"firmware_version":"1.0.1", "serial_number":"SN-001"});
    console.log('Attributes published!');
    client.publish('v1/devices/me/telemetry', {"temperature":21, "humidity":55.0, "active": false});
    console.log('Telemetry published!');
    client.end();
});
