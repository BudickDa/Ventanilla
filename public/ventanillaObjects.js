var Block = function (uid, type, name, position, hardware) {
    this.uid = uid;
    this.position = position;
    //defines type of hardware (sensor, actor, interface, logic)
    this.type = type;
    this.name = type;
    //the actual hardware object
    if (type === "interface") {
      this.hardware = new Interface(hardwareType);
    };
    if (type === "sensor") {
      this.hardware = new Sensor(hardwareType);
    };
    this.setPosition = function (position) {
      this.position = position;
    };
    this.input = [];
    this.output = [];
  }
var Sensor = function (type) {
    this.pin = "";
    //frequenz of sending data. Default is every 250ms
    this.freq = 500;
    //emits change events when the data has changed 1 Unit
    this.thresholdt: 1;
    //object that has this sensor as input
    this.setFrequenz = function (freq) {
      this.freq = freq
    };
    this.setPin = function (pin) {
      this.pin = pin
    };
    this.setThreshold = function (thresholdt) {
      this.thresholdt = thresholdt;
    };
  }
var Interface = function (type) {
    //type of interface(e.g. UI, arduino)
    this.type = type;
    if (type === "arduino") {
      this.port = ["A0", "A1", "A2"];
      this.output = [];
    }
    if (type === "UI") {
      this.input = [];
      this.output = [];
    }
  }
