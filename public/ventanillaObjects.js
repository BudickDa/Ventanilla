var Block = function (uid,position,index,type,name,system,hardware,input) {
  this.uid = uid;
  //position of block in backend
  this.position = position;
  //the index value in blocks array. Is set on load.
  this.index = index;
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

var ArduinoUno = function (port) {
    this.port = port;
  }

var Ui = function() {  
}




/*global helper functions*/

/*contains relations between blocks in a relation object*/
var relations = [];
/*here all the registered blocks are saved*/
var blocks = [];

/*
* Logs Message into console.
* Todo: Check if console is available
*/
function log(msg){
  console.log(msg);
}

/*
* gets index of block from uid
*/
function getIndex(uid){
  for(i in blocks){
    if(blocks[i].uid === uid){
      return i;
    }
  }
  return -1;
}

/*
* Loads relation and block data from localStorage..
* Todo: Check if localStorage is available.
*/
function load(cb,cb2){
  if(localStorage.relations!==undefined){
    relations = JSON.parse(localStorage.relations);
  }
  if(localStorage.blocks!==undefined){
    var blockData = JSON.parse(localStorage.blocks);
    for(i in blockData){
      if(blockData[i].input===undefined){
        var input = [];
      }else{
        var input = blockData[i].input;
      }
      var index = blocks.length;
      blocks.push(new Block(blockData[i].uid,blockData[i].position,index,blockData[i].type,blockData[i].name,blockData[i].system,blockData[i].hardware,input));
    }
  }
  log("Data was loaded");
  return cb(cb2);
}

/*
* Saves blocks and relation to localStorage
* Todo: Check if localStorage is available.
*/
function save(){
  log("Save to local storage");
  localStorage.blocks = JSON.stringify(blocks);
  localStorage.relations = JSON.stringify(relations);
}

/*
* Deletes everything.
*/
function deleteAll() {
  blocks = [];
  relations = [];
  $("#sketch").html("");
  log("Delete all...");
  return save();
}
