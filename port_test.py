import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD) #pin numbering scheme uses board header pins
GPIO.setup(8,GPIO.OUT) #pin 8, GPIO15

while True:
	'''test pin8 GPIO15'''
	GPIO.output(8,1) #output high to pin 8
	time.sleep(0.5) #delay 0.5 sec
	GPIO.output(8,0) #output low to pin 8
	time.sleep(0.5)
	
