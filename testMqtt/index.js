var mqtt = require('mqtt');
console.log('Connecting to: %s using access token: %s', 'demo.thingsboard.io', '8v9od7LSarjmlorE9J4Y');

var client  = mqtt.connect('mqtt://'+ 'demo.thingsboard.io',{
    username: '8v9od7LSarjmlorE9J4Y'
});

client.on('connect', function () {
    console.log('connected');
    client.subscribe('v1/devices/me/rpc/response/+');
    client.subscribe('v1/devices/me/rpc/request/+');
    var requestId = 1;
    var request = {
        method: "sendMsg",
        params: {
            deviceId: "d78540d0-0200-11e8-abe9-1d8d2edf4f93",
            timeout: 2000,
            oneway: false,
            body: {
                param1: "value1"
            }
        }
    };
    client.publish('v1/devices/me/rpc/request/' + requestId, JSON.stringify(request));
});

client.on('message', function (topic, message) {
    console.log('response.topic: ' + topic);
    console.log('response.body: ' + message.toString());
    client.publish(topic.replace('request', 'response'), '{"status":"ok"}');
});