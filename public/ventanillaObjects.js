uid,ui.position,type,name,system,new Sensor(pin,freq,treshold)
var Block = function (uid,position,type,name,system,hardware,input) {
  this.uid = uid;
  this.position = position;
  //defines type of hardware (sensor, actor, interface, logic)
  this.type = type;
  this.name = name;
  this.system = system;    
  //the actual hardware object
  this.hardware = hardware;
  this.input = input;
}

var Sensor = function (pin,freq,threshold) {
  //frequenz of sending data.
  this.pin = pin;
  //frequenz of sending data.
  this.freq = freq;
  //emits change events when the data has changed
  this.threshold = threshold;
}

var ArduinoUno = function (type,port) {
    this.port = port;
    this.setPort = function(port){
      this.port = port;
    }
  }

var Ui = function() {  
}




/*global helper functions*/
function log(msg){
  console.log(msg);
}
