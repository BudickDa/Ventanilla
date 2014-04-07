var Block = function (uid,position,type,name,system,hardware,input) {
  this.uid = uid;
  //position of block in backend
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

var ArduinoUno = function (port) {
    this.port = port;
  }

var Ui = function() {  
}


/*global helper functions*/

/*contains relations between blocks in a relation object*/
var relations = [];

var relation = function(source,target){
  this.source = source;
  this.target = target;
}
/*here all the registered blocks are saved*/
var blocks = {};

/*
* Logs Message into console.
* Todo: Check if console is available
*/
function log(msg){
  console.log(msg);
}


/*
* Loads relation and block data from localStorage..
* Todo: Check if localStorage is available.
*/
function load(paintUi, initUi,drawConnections){
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
      blocks[blockData[i].uid] = new Block(blockData[i].uid,blockData[i].position,blockData[i].type,blockData[i].name,blockData[i].system,blockData[i].hardware,input);
    }
  }
  log("Data was loaded");
  return paintUi(initUi,drawConnections);
}

/*
* Saves blocks and relation to localStorage
* Todo: Check if localStorage is available.
*/
function save(blocks,relations){
  log("Save to local storage");
  log(JSON.stringify(relations));
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
  return save(blocks,relations);
}
