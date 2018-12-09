import os
import time
import sys
import Adafruit_DHT as dht
import paho.mqtt.client as mqtt
import json

THINGSBOARD_HOST = 'demo.thingsboard.io'
ACCESS_TOKEN = '8v9od7LSarjmlorE9J4Y'

# Data capture and upload interval in seconds. Less interval will eventually hang the DHT22.
INTERVAL=2

sensor_data = {'temperature': 0, 'humidity': 0}

next_reading = time.time()

client = mqtt.Client()

# Set access token
client.username_pw_set(ACCESS_TOKEN)

# Connect to ThingsBoard using default MQTT port and 60 seconds keepalive interval
client.connect(THINGSBOARD_HOST, 1883, 60)

client.loop_start()

try:
    while True:
        humidity,temperature = dht.read_retry(dht.DHT11, 4)
	if humidity is not None and temperature is not None:
		print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
#       humidity = round(humidity, 2)
#	temperature = round(temperature, 2)
#	print("Temperature: {0}*C, Humidity: {1}%".format(temperature,  humidity))
		sensor_data['temperature'] = temperature
		sensor_data['humidity'] = humidity

        # Sending humidity and temperature data to ThingsBoard
        	client.publish('v1/devices/me/telemetry', json.dumps(sensor_data), 1)
	else:
		print('Failed to get reading. Try again!')
        next_reading += INTERVAL
        sleep_time = next_reading-time.time()
        if sleep_time > 0:
            time.sleep(sleep_time)
except KeyboardInterrupt:
    pass

client.loop_stop()
client.disconnect()
