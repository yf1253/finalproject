/*
The circuit:
  - 2-axis joystick connected to pins A0 and A1
  - pushbuttons connected to pin D6

  Converts analog input on A0 and A1 to control the x and y movements of UP_ARROW, RIGHT_ARROW, DOWN_ARROW, 
  LEFT_ARROW on the keyboard.
  Uses digital input on pins 6 for SPACE BAR on the keyboard. 
  
References:
  - https://www.youtube.com/watch?v=gSag3HmyOgE
  - https://www.arduino.cc/reference/en/language/functions/usb/keyboard/keyboardpress/
  - https://www.youtube.com/watch?v=29QYRpppHv8
  - 
*/


//keyboard library
#include <Keyboard.h> // https://www.arduino.cc/reference/en/language/functions/usb/keyboard/ 


const int BUTTON_SPACEBAR_PIN = 6;
const int JOYSTICK_UPDOWN_PIN = A0; 
const int JOYSTICK_LEFTRIGHT_PIN = A1; 


// The joysticks orientation with respect to the user
enum JoystickYDirection {
  UP,
  RIGHT,
  DOWN,
  LEFT
};

enum JoystickYDirection joystickYDir = RIGHT;

const int MAX_ANALOG_VAL = 1023;
const int JOYSTICK_CENTER_VALUE = int(MAX_ANALOG_VAL / 2);

// Sets the overall amount of movement in either X or Y direction
const int JOYSTICK_MOVEMENT_THRESHOLD = 30; 

boolean isSpaceBarPressed = false;
boolean isUpKeyPressed = false;
boolean isRightKeyPressed = false;
boolean isDownKeyPressed = false;
boolean isLeftKeyPressed = false;

//int prevButtonMouseToggleVal = HIGH;

void setup() {

  pinMode(BUTTON_SPACEBAR_PIN, INPUT_PULLUP);

  // Turn on serial for debugging
  Serial.begin(9600); 
  Keyboard.begin(); //Initializes Keyboard library and enables USB HID stack
}


void loop() {
  // delay(1000);

  int buttonSpaceBarVal = digitalRead(BUTTON_SPACEBAR_PIN);


  // HANDLE JOYSTICK INPUT AS KEYBOARD //
  int joystickUpDownVal = analogRead(JOYSTICK_UPDOWN_PIN);
  int joystickLeftRightVal = analogRead(JOYSTICK_LEFTRIGHT_PIN);

  //The code below handles the different orientations
  if(joystickYDir == RIGHT){
    int tmpX = joystickLeftRightVal;
    joystickLeftRightVal = joystickUpDownVal;
    joystickUpDownVal = MAX_ANALOG_VAL - tmpX;
  }else if(joystickYDir == DOWN){
    joystickUpDownVal = MAX_ANALOG_VAL - joystickUpDownVal;
    joystickLeftRightVal = MAX_ANALOG_VAL - joystickLeftRightVal;
  }else if(joystickYDir == LEFT){
    int tmpX = joystickLeftRightVal;
    joystickLeftRightVal = MAX_ANALOG_VAL - joystickUpDownVal;
    joystickUpDownVal = tmpX;
  }

  // Serial.print("joystickLeftRightVal: ");
  // Serial.print(joystickLeftRightVal);
  // Serial.print(" joystickUpDownVal: ");
  // Serial.println(joystickUpDownVal);

  int yDistFromCenter = joystickUpDownVal - JOYSTICK_CENTER_VALUE;
  int xDistFromCenter = joystickLeftRightVal - JOYSTICK_CENTER_VALUE;
  
  // Serial.print("xDistFromCenter: ");
  // Serial.print(xDistFromCenter);    
  // Serial.print(" yDistFromCenter: ");
  // Serial.println(yDistFromCenter);

  /** UP_ARROW KEY **/
  if(yDistFromCenter > 0 && abs(yDistFromCenter) > JOYSTICK_MOVEMENT_THRESHOLD){
    isUpKeyPressed = true;
    Keyboard.press(KEY_UP_ARROW);
    Serial.println(yDistFromCenter);
  } else if (abs(yDistFromCenter) < JOYSTICK_MOVEMENT_THRESHOLD){
    Keyboard.release(KEY_UP_ARROW);
    isUpKeyPressed = false;
  }
  
    /** DOWN_ARROW KEY **/
  if(yDistFromCenter < 0 && abs(yDistFromCenter) > JOYSTICK_MOVEMENT_THRESHOLD){
    isDownKeyPressed = true;
    Keyboard.press(KEY_DOWN_ARROW);
    Serial.println(yDistFromCenter);
  } else if (abs(yDistFromCenter) < JOYSTICK_MOVEMENT_THRESHOLD){
    Keyboard.release(KEY_DOWN_ARROW);
    isDownKeyPressed = false;
  }

   /** RIGHT_ARROW KEY **/
  if(xDistFromCenter > 0 && abs(xDistFromCenter) > JOYSTICK_MOVEMENT_THRESHOLD){
    isRightKeyPressed = true;
    Keyboard.press(KEY_RIGHT_ARROW);
    Serial.println(xDistFromCenter);
  } else if (abs(xDistFromCenter) < JOYSTICK_MOVEMENT_THRESHOLD){
    Keyboard.release(KEY_RIGHT_ARROW);
    isRightKeyPressed = false;
  }

   /** LEFT_ARROW KEY **/
  if(xDistFromCenter < 0 && abs(xDistFromCenter) > JOYSTICK_MOVEMENT_THRESHOLD){
    isLeftKeyPressed = true;
    Keyboard.press(KEY_LEFT_ARROW);
    Serial.println(xDistFromCenter);
  } else if (abs(xDistFromCenter) < JOYSTICK_MOVEMENT_THRESHOLD){
    Keyboard.release(KEY_LEFT_ARROW);
    isLeftKeyPressed = false;
  }
  
  // HANDLE BUTTON INPUT AS KEYBOARD //

  if(buttonSpaceBarVal == LOW){
    isSpaceBarPressed = true;
    Keyboard.press(' ');
    Serial.print("SPACE BAR: Pressed\t");
    isSpaceBarPressed = true;
  } else if(isSpaceBarPressed == true && buttonSpaceBarVal == HIGH){
    Keyboard.release(' ');
    isSpaceBarPressed = false;
  }

  delay(50);
}

