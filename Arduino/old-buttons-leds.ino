// Power
const int button0 = 2;
const int led0 = 0;

// Device 1-2-3
const int button1 = 3;
const int led1 = 10;
const int button2 = 5;
const int led2 = 11;
const int button3 = 6;
const int led3 = 12;

int powerOn = false;
int activeLED = led1;

int buttonState0 = LOW;
int buttonState1 = LOW;
int buttonState2 = LOW;
int buttonState3 = LOW;

void setup() {
  Serial.begin(9600);

  pinMode(led0, OUTPUT);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);

  digitalWrite(led0, LOW);
  digitalWrite(led1, LOW);
  digitalWrite(led2, LOW);
  digitalWrite(led3, LOW);

  pinMode(button0, INPUT);
  pinMode(button1, INPUT);
  pinMode(button2, INPUT);
  pinMode(button3, INPUT);
}

void loop() {
  buttonState0 = digitalRead(button0);
  buttonState1 = digitalRead(button1);
  buttonState2 = digitalRead(button2);
  buttonState3 = digitalRead(button3);
Serial.print(buttonState0);
Serial.print(buttonState1);
Serial.print(buttonState2);
Serial.println(buttonState3);
  if (LOW == buttonState0) {
    toggle_power();
    while (LOW == buttonState0) {
      delay(100);
      buttonState0 = digitalRead(button0);
    }
  } else if (powerOn) {
    if (LOW == buttonState1 and led1 != activeLED) {
      switch_device(led1);
    } else if (LOW == buttonState2 and led2 != activeLED) {
      switch_device(led2);
    } else if (LOW == buttonState3 and led3 != activeLED) {
      switch_device(led3);
    }
  }
}

void switch_device( int led ) {
  Serial.print("led: ");
  Serial.println(led);
  Serial.print("active: ");
  Serial.println(activeLED);

  digitalWrite(activeLED, LOW);
  digitalWrite(led, HIGH);
  activeLED = led;
}

void toggle_power(){
  Serial.print("power on active led is ");
  Serial.println(activeLED);
  if (powerOn) {
    digitalWrite(activeLED, LOW);
    digitalWrite(led0, LOW);
    powerOn = false;
  } else {
    digitalWrite(led0, HIGH);
    digitalWrite(activeLED, HIGH);
    powerOn = true;
  }
}
