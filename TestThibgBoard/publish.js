var mqtt = require('mqtt');

console.log('Connecting to: %s using access token: %s', 'demo.thingsboard.io', 'DkiMfuhVrpaIWjdW5zbR');

var client  = mqtt.connect('mqtt://'+ 'demo.thingsboard.io',{
    username: 'DkiMfuhVrpaIWjdW5zbR'
});

client.on('connect', function () {
    console.log('Client connected!');
    var n = 0;
    var version = "1.0.";
    var temperature = 0;
    var humidity = 0;
    while(n<100){
        version += n;
        temperature += n;
        humidity += n;
        console.log(version);
        console.log(temperature);
        console.log(humidity);
        client.publish('v1/devices/me/attributes', "{'firmware_version':"+version+", 'serial_number':'SN-001'}");
        client.publish('v1/devices/me/telemetry', "{'temperature':"+temperature+", 'humidity':"+humidity+", 'active':"+ n%2===0+"}");
        console.log('Data published!');
    }

    client.end();
});
