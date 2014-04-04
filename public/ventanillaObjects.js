
var Sensor = function (type,pin,freq,threshold) {
    //frequenz of sending data. Default is A0 for now
    this.pin = pin;
    //frequenz of sending data. Default is every 500ms
    this.freq = freq;
    //emits change events when the data has changed 1 Unit
    this.threshold = threshold;
    //object that has this sensor as input
    this.setFrequenz = function (freq) {
      this.freq = freq
    };
    this.setPin = function (pin) {
      this.pin = pin
    };
    this.setThreshold = function (threshold) {
      this.thresholdt = thresholdt;
    };
  }

var ArduinoBoard = function (type,port) {
    //type of interface(e.g. UI, arduino)
    this.type = type;
    this.port = port;
    this.setPort = function(port){
      this.port = port;
    }
  }

var Ui = function() {
  
}


var Block = function (uid, type, name, position, input) {
    this.uid = uid;
    this.position = position;
    //defines type of hardware (sensor, actor, interface, logic)
    this.type = type;
    this.name = name;
    //the actual hardware object
    if (type === "ArduinoBoard") {
      this.hardware = new ArduinoBoard(port);
    };
    if (type === "Ui") {
      this.hardware = new Ui();
    };
    if (type === "Sensor") {
      this.hardware = new Sensor(type,pin,freq,thresholdt);
    };
    this.setPosition = function (position) {
      this.position = position;
    };
    this.input = input;
  }

