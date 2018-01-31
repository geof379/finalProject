
var firebase = require('firebase');
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var mqtt = require('mqtt');
console.log('Connecting to: %s using access token: %s', 'demo.thingsboard.io', '8v9od7LSarjmlorE9J4Y');


var client  = mqtt.connect('mqtt://'+ 'demo.thingsboard.io',{
    username: '8v9od7LSarjmlorE9J4Y'
});

var config = {
    apiKey: "AIzaSyAyBDWV63csBHFDe_PD7OG_6GYGvOkQoMU",
    authDomain: "blinkingled-52343.firebaseapp.com",
    databaseURL: "https://blinkingled-52343.firebaseio.com",
    projectId: "blinkingled-52343",
    storageBucket: "blinkingled-52343.appspot.com",
    messagingSenderId: "190458913479"
};
firebase.initializeApp(config);

var gpio_state = {"7": "False"};

var LED  = new Gpio(7, 'out');
function getGpioStatus(){
    return JSON.stringify(gpio_state);
}

function setGpioStatus(pin, status){
    firebase.database().ref("LED"+pin).set(status);
}

firebase.database().ref("LED7").on("value",function(snapshot){
    if(snapshot.val() === "on"){
        LED.writeSync(1);
    }else{
        LED.writeSync(0);
    }
});

client.on('connect', function () {
    console.log('Client connected!');
    client.subscribe('v1/devices/me/rpc/request/+');
    client.publish('v1/devices/me/attributes', getGpioStatus(), 1);

});

client.on('message', function (topic, message) {
    console.log('response.topic: ' + topic);
    console.log('response.body: ' + message.toString());
    client.publish(topic.replace('request', 'response'), '{"status":"ok"}');
});