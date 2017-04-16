// Pins
const int pinBtnPower = 13;
const int pinBtn1 = 12;
const int pinBtn2 = 11;
const int pinBtn3 = 10;
const int pinLEDPower = 9;
const int pinLED1 = 6;
const int pinLED2 = 5;
const int pinLED3 = 3;

int powerOn = false;
int activeLED = pinLED1;

int btnStatePower = LOW;
int btnState1 = LOW;
int btnState2 = LOW;
int btnState3 = LOW;

void setup() {
  pinMode( pinLEDPower, OUTPUT );
  pinMode( pinLED1, OUTPUT );
  pinMode( pinLED2, OUTPUT );
  pinMode( pinLED3, OUTPUT );

  pinMode( pinBtnPower, INPUT );
  pinMode( pinBtn1, INPUT );
  pinMode( pinBtn2, INPUT );
  pinMode( pinBtn3, INPUT );
}

void loop() {
  btnStatePower = digitalRead( pinBtnPower );
  btnState1 = digitalRead( pinBtn1 );
  btnState2 = digitalRead( pinBtn2 );
  btnState3 = digitalRead( pinBtn3 );

  if ( LOW == btnStatePower ) {
    toggle_power();
    while ( LOW == btnStatePower ) {
      delay(100);
      btnStatePower = digitalRead( pinBtnPower );
    }
  } else if ( powerOn ) {
    if ( LOW == btnState1 and pinLED1 != activeLED ) {
      switch_device( pinLED1 );
    } else if ( LOW == btnState2 and pinLED2 != activeLED ) {
      switch_device( pinLED2 );
    } else if ( LOW == btnState3 and pinLED3 != activeLED ) {
      switch_device( pinLED3 );
    }
  }
}

void switch_device( int led ) {
  digitalWrite( activeLED, LOW );
  digitalWrite( led, HIGH );
  activeLED = led;
}

void toggle_power() {
  if ( powerOn ) {
    digitalWrite( activeLED, LOW );
    digitalWrite( pinLEDPower, LOW );
  } else {
    digitalWrite( pinLEDPower, HIGH );
    digitalWrite( activeLED, HIGH );
  }

  powerOn = ! powerOn;
}

