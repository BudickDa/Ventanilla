 /**
        Creates an input-object
        @param pin the pin object of the foreign pin that is connected with block
    */
var Input = function(pin){
  this.pin = pin;
}

 /**
        Creates an pin-object
        @param uid is the uid of the block that owns this pin
        @param pid is the unique id of the pin
        @param type is the datatype of the pin
        @param direction is the direction of the dataflow (input-pin or output-pin)
    */
var Pin = function(uid,pid,type,direction){
  if(uid===undefined){
    uid=-1;
  }
  this.uid = uid;
  this.pid = pid;
  this.type = type;
  this.direction = direction;
}



var Block = function (uid,position,type,name,system,hardware,input,unique,pins) {
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
  /*Blocks are unique for examplethe uid of the source-block: ArduinoBoards*/
  this.unique = unique;
  this.pins = pins;
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
var Port = function(port) {
  this.port
}

var Logic = function(logicType) {
  this.logicType = logicType;
}
/*global helper functions*/

/*contains relations between blocks in a relation-array*/
var relations = [];

 /**
        Creates a relation-object
        @param source a pin-object of the source-block
        @param target a pin-object of the target-block
    */
var Relation = function(source, target){
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
* Loads block of ui
* Todo: Check if localStorage is available.
*/
function loadUiBlock(uid,cb){
  if(localStorage.blocks!==undefined){
    var blockData = JSON.parse(localStorage.blocks);
    var blocks = {};
    for(i in blockData){
      if(blockData[i].input.length===0){
        blockData[i].input = [];
      }
      if(blockData[i].uid === uid){
        var uiBlock = new Block(blockData[i].uid,blockData[i].position,blockData[i].type,blockData[i].name,blockData[i].system,blockData[i].hardware,blockData[i].input,blockData[i].unique,blockData[i].pins);
      }
      blocks[blockData[i].uid] = new Block(blockData[i].uid,blockData[i].position,blockData[i].type,blockData[i].name,blockData[i].system,blockData[i].hardware,blockData[i].input,blockData[i].unique,blockData[i].pins);
    }
    return cb(uiBlock, blocks)
  }
}
/*
* Loads relation and block data from localStorage..
* Todo: Check if localStorage is available.
*/
function load(cb){
  if(localStorage.relations!==undefined){
    relations = JSON.parse(localStorage.relations);
  }
  if(localStorage.blocks!==undefined){
    var blockData = JSON.parse(localStorage.blocks);
    for(i in blockData){
      if(blockData[i].input.length===0){
        blockData[i].input = [];
      }
      blocks[blockData[i].uid] = new Block(blockData[i].uid,blockData[i].position,blockData[i].type,blockData[i].name,blockData[i].system,blockData[i].hardware,blockData[i].input,blockData[i].unique,blockData[i].pins);
    }
  }
  log("Data was loaded");
  return cb(blocks,relations);
}

/*
* Saves blocks and relation to localStorage
* Todo: Check if localStorage is available.
*/
function save(blocks,relations){
  log("Save to local storage");
  log(blocks);
  log(relations);
  localStorage.blocks = JSON.stringify(blocks);
  localStorage.relations = JSON.stringify(relations);
}


/*
* Deletes everything.
*/
function deleteAll() {
  if(!printWarning("This will delete all blocks and requires the application to be restarted. Do you really want to do this?")){
    return save(blocks,relations);
  }
  var uids = [];
  for(i in blocks){
    uids.push(blocks[i].uid);
  }
  blocks = {};
  relations =[];
  $("#sketch").html("");
  log("Delete all...");
  $.post('delete', {uids: uids});
  return save(blocks,relations);
}

/*
* Deletes block.
*/
function deleteBlock(uid){
  if(!printWarning("This will delete all blocks and requires the application to be restarted. Do you really want to do this?")){
    return save(blocks,relations);
  }
  /*Destroy relationship*/
  for(i in relations){
    if(relations[i].source === uid || relations[i].target === uid){
      relations.splice(i,1);
      if(relations[i].source === uid){
        for(j in blocks[relations[i].target].input){
          if(blocks[relations[i].target].input[j] === uid){
            blocks[relations[i].target].input.splice(j,1);
          }
        }
      }
    }
  }

  /*delete block from blocks*/
  delete blocks[uid];
  $("#uid"+uid).remove();
  $.post('delete', {uids: [uid]});
  return save(blocks,relations);
}

function printError(msg){
  alert(msg);
}
function printWarning(msg){
  return confirm(msg);
}
