var mqtt = require('mqtt');

console.log('Connecting to: %s using access token: %s', 'demo.thingsboard.io', 'DkiMfuhVrpaIWjdW5zbR');

var client  = mqtt.connect('mqtt://'+ 'demo.thingsboard.io',{
    username: 'DkiMfuhVrpaIWjdW5zbR'
});

client.on('connect', function () {
    console.log('Client connected!');
    var n = 0;
    while(n<100){
        client.publish('v1/devices/me/attributes', {"firmware_version":""+n, "serial_number":"SN-001"});
        client.publish('v1/devices/me/telemetry', {"temperature":n, "humidity":53.0+n, "active": n%2===0});
        console.log('Data published!');
    }

    client.end();
});
