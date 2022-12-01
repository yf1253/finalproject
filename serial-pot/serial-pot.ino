#include <ArduinoBLE.h>

const int buttonPin = 4; // set buttonPin to digital pin 4
const int potPin = A0; //potentiometer 

BLEService nanoService("ee1222f3-4f86-44c6-8671-9533144d550d"); // create service

// create button characteristic and allow remote device to get notifications
BLEIntCharacteristic buttonCharacteristic("11fc6ed6-e342-4db0-8621-57eaa8b30831", BLERead | BLENotify);
BLEIntCharacteristic potCharacteristic("aa720013-e6e9-40fb-882e-21ca3bea66c0", BLERead | BLENotify);


int sensorValue = 255;


void setup() {
  Serial.begin(9600);
  while (!Serial);

  //pinMode(ledPin, OUTPUT); // use the LED as an output
  pinMode(buttonPin, INPUT); // use button pin as an input
  pinMode(potPin, INPUT);

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");

    while (1);
  }

  // set the local name peripheral advertises
  BLE.setLocalName("Arduino Nano");
  // set the UUID for the service this peripheral advertises:
  BLE.setAdvertisedService(nanoService);

  // add the characteristics to the service
  nanoService.addCharacteristic(buttonCharacteristic);
  nanoService.addCharacteristic(potCharacteristic);

  // add the service
  BLE.addService(nanoService);

  buttonCharacteristic.writeValue(0);
  potCharacteristic.writeValue(0);

  // start advertising
  BLE.advertise();

  Serial.println("Bluetooth device active, waiting for connections...");
}

void loop() {
  // poll for BLE events
  BLE.poll();

  if (millis() % 100 == 0) {
    sensorValue = digitalRead(buttonPin);
    Serial.println(sensorValue);
    buttonCharacteristic.writeValue(sensorValue);

    float potValue = analogRead(potPin);
    Serial.println(potValue);
    potCharacteristic.writeValue(potValue);
    
    delay(1);
  }

}

