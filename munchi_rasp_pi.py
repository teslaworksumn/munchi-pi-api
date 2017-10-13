import time
import RPi.GPIO as GPIO
import Adafruit_ADS1x15

THERMISTORVALUE 100000
SERIESRESISTOR 100000 #series resistor to thermistor
BCOEFFICIENT 4072

thermistorR2Temp = {3.2575:0, 2.5348:5, 1.9876:10, 1.5699:15, 1.2488:20, 1.0000:25, 0.80594:30, 0.65355:35, 0.53312:40, 0.43735:45, 0.36074:50, 0.29911:55, 0.24925:60, 0.20872:65, 0.17558:70, 0.14837:75, 0.12592:80, 0.10731:85, 0.091816:90, 0.078862:95, 0.067988:100, 0.058824:105, 0.051071:110}

GPIO.setmode(GPIO.BOARD) #pin numbering scheme uses board header pins
GPIO.setup(19,GPIO.out) #pin 19, GPIO12 output
GPIO.setup(26,GPIO.out) #pin 26, GPIO07 output

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
	reading = adc.read_adc(0, gain=GAIN) #read A0, 12 bit signed integer, -2048 to 2047 (0=GND, 2047=4.096*gain)
	voltReading = reading * 4.096 / 2047.0 #convert adc to voltage
	thermoR = SERIESRESISTOR / ((4.0/voltReading) - 1)#convert voltage to thermoster resistance
	#7002 thermistor
	#temp = 
	
	print ("reading: " + reading)
	print ("thermistor resistance: " + thermoR)
	#print ("temp: " + temp)
