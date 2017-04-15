#!/usr/bin/python

import RPi.GPIO as GPIO
from time import sleep

# Pins
pin_button_power = 18
pin_button_1 = 23
pin_button_2 = 24
pin_button_3 = 25
pin_led_power = 12
pin_led_1 = 16
pin_led_2 = 20
pin_led_3 = 21

# States
power_on = False
active_led = pin_led_1

GPIO.setmode( GPIO.BCM )
GPIO.setup( pin_led_power, GPIO.OUT )
GPIO.setup( pin_led_1, GPIO.OUT )
GPIO.setup( pin_led_2, GPIO.OUT )
GPIO.setup( pin_led_3, GPIO.OUT )

GPIO.output( pin_led_power, GPIO.LOW )
GPIO.output( pin_led_1, GPIO.LOW )
GPIO.output( pin_led_2, GPIO.LOW )
GPIO.output( pin_led_3, GPIO.LOW )

GPIO.setup( pin_button_power, GPIO.IN )
GPIO.setup( pin_button_1, GPIO.IN )
GPIO.setup( pin_button_2, GPIO.IN )
GPIO.setup( pin_button_3, GPIO.IN )

def switch_device( led ) :
	global active_led

  	GPIO.output( active_led, GPIO.LOW )
	GPIO.output( led, GPIO.HIGH )
	active_led = led

def toggle_power() :
	global power_on

	if ( power_on ) :
		GPIO.output( active_led, GPIO.LOW )
		GPIO.output( pin_led_power, GPIO.LOW )
	else :
		GPIO.output( pin_led_power, GPIO.HIGH )
		GPIO.output( active_led, GPIO.HIGH )

	power_on = not power_on

try :
	while ( True ) :
		if ( GPIO.LOW == GPIO.input( pin_button_power ) ) :
			toggle_power()
			while ( GPIO.LOW == GPIO.input( pin_button_power ) ) :
				sleep( 0.1 )
		elif ( power_on ) :
			if ( GPIO.LOW == GPIO.input( pin_button_1 ) and pin_led_1 != active_led ) :
				switch_device( pin_led_1 )
			elif ( GPIO.LOW == GPIO.input( pin_button_2 ) and pin_led_2 != active_led ) :
				switch_device( pin_led_2 )
			elif ( GPIO.LOW == GPIO.input( pin_button_3 ) and pin_led_3 != active_led ) :
				switch_device( pin_led_3 )
except KeyboardInterrupt :
	print 'Exiting via CTRL+C...'
finally :
	GPIO.cleanup()
