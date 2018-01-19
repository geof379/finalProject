
var firebase = require('firebase');
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAyBDWV63csBHFDe_PD7OG_6GYGvOkQoMU",
    authDomain: "blinkingled-52343.firebaseapp.com",
    databaseURL: "https://blinkingled-52343.firebaseio.com",
    projectId: "blinkingled-52343",
    storageBucket: "blinkingled-52343.appspot.com",
    messagingSenderId: "190458913479"
  };
  firebase.initializeApp(config);

var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
LED.writeSync(1);
var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms

function blinkLED() { //function to start blinking
  if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
//    LED.writeSync(1); //set pin state to 1 (turn LED on)
    firebase.database().ref("D").set("on");
  } else {
  //  LED.writeSync(0); //set pin state to 0 (turn LED off)
    firebase.database().ref("D").set("off");
 }
}
var i = 0;
firebase.database().ref("D").on("value",function(snapshot){
	console.log(i);
	i++;
	if(snapshot.val() === "on"){
		LED.writeSync(1);
	}else{
		LED.writeSync(0);
	}
});

function endBlink() { //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport GPIO to free resources
}

setTimeout(endBlink, 5000); //stop blinking after 5 seconds

