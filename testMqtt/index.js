var mqtt = require('mqtt');
console.log('Connecting to: %s using access token: %s', 'demo.thingsboard.io', '8v9od7LSarjmlorE9J4Y');

var client  = mqtt.connect('mqtt://'+ 'demo.thingsboard.io',{
    username: '8v9od7LSarjmlorE9J4Y'
});

client.on('connect', function () {
    client.subscribe('presence');
    client.publish('presence', 'Hello mqtt');
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    client.end()
});