package ca.ets.pi4led.controller;

import com.pi4j.io.gpio.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by AN42490 on 19/01/2018.
 */

@RestController
public class LedController {

    private static GpioPinDigitalOutput pin;
    @RequestMapping("/")
    public String greeting(){
        return "hello";
    }

    @RequestMapping("/light")
    public String light(){
        if(pin == null){
            GpioController gpio = GpioFactory.getInstance();
            pin = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_04,"MyLed", PinState.LOW);
        }
        pin.toggle();
        return "OK";
    }
}
