import time
import RPi.GPIO as GPIO
import Adafruit_ADS1x15

GPIO.setmode(GPIO.BOARD) #pin numbering scheme uses board header pins
GPIO.setup(8,GPIO.OUT) #pin 8, GPIO15

adc = Adafruit_ADS1x15.ADS1015() #create an ADS1015 ADC (12-bit) instance.

# Choose a gain of 1 for reading voltages from 0 to 4.09V.
# Or pick a different gain to change the range of voltages that are read:
#  - 2/3 = +/-6.144V
#  -   1 = +/-4.096V
#  -   2 = +/-2.048V
#  -   4 = +/-1.024V
#  -   8 = +/-0.512V
#  -  16 = +/-0.256V
# See table 3 in the ADS1015/ADS1115 datasheet for more info on gain.
GAIN = 1

while True:
	'''test adc'''
	reading = adc.read_adc(0, gain=GAIN) #read A0, 12 bit signed integer, -2048 to 2047 (0=GND, 2047=4.096*gain)
	#reading = adc.read_adc(0) #gain defaults to 1
	print(reading)
	if reading < 1000:
		GPIO.output(8,0)
	else:
		GPIO.output(8.1)
	time.sleep(0.5)
