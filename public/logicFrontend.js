var ui = $("#data").data("ui");
var io = io.connect();

//init UI
$(document).ready(function () {
  io.emit("block");
  initVentanilla();
});

function initVentanilla() {
  load(function (blocks, relations) {
    //get sensors of UI
    getConnectedBlocks(ui, blocks, relations);
    return paintUi(blocks);
  });
}

function paintUi(blocks) {
  var uiBlock = blocks[ui];
  log("Paint ui out of object: ");
  log(uiBlock);
  for(i in uiBlock.input){
    if (blocks[uiBlock.input[i]].type === "sensor") {
      log(blocks[uiBlock.input[i]]);
      log(blocks[blocks[uiBlock.input[i]].input[0]]);
      registerBlock(blocks[uiBlock.input[i]]);
    }
  }
}

function registerBlock(block) {
  createSensor(sensor, function (uid) {
    subscribeToBlock(uid);
    return $("#display").append(square("Temperature", "uid" + uid));
  });
}

function subscribeToBlock(uid) {
  log("Subscribe to socket " + uid);
  io.on("uid" + uid, function (data) {
    $(".data.uid" + uid).html(data.celsius);
  });
}

function createSensor(sensor, interface, cb) {
  $.post("/registerSensor", {
    sensor: sensor,
    interface: interface
  }, function (err) {
    if (err) {
      log(err);
    } else {
      log("Created Sensor " + sensor.uid);
      return cb(sensor.uid);
    }
  });
}

/*todo: comment*/

function getConnectedBlocks(targetId, blocks, relations) {
  var input = [];
  blocks[targetId].input = [];
  for (i in relations) {
    if (relations[i].target === targetId) {
      blocks[targetId].input.push(relations[i].source);

      if (blocks[relations[i].source].output === undefined) {
        blocks[relations[i].source].output = [];
      }

      blocks[relations[i].source].output.push(targetId);
      getConnectedBlocks(relations[i].source, blocks, relations);
    }
  }
}



function log(msg) {
  if (console != undefined) {
    console.log(msg);
  }
}

function load(cb) {
  var blocks = [];
  relations = [];
  if (localStorage.relations !== undefined) {
    relations = JSON.parse(localStorage.relations);
  }
  if (localStorage.blocks !== undefined) {
    var blockData = JSON.parse(localStorage.blocks);
    log(blockData);
    for (i in blockData) {
      blocks[blockData[i].uid] = new Block(blockData[i].uid, blockData[i].type, blockData[i].hardware.type, blockData[i].position);
      //test if pin is set
      if (blockData[i].hardware.pin !== "" && blockData[i].type === "sensor") {
        log("set pin of Sensor...")
        blocks[blockData[i].uid].hardware.setPin(blockData[i].hardware.pin);
      }
    }
    log("Data was loaded");
    return cb(blocks, relations);
  }
}

  /* Itemtemplates: 
   *  .square => square duh
   *  .skyscraper => height = 2 * width
   *  .bar => 2 * height = width
   *  over uid the value is set
   */
  var square = function (title, uid) {
      return "<div class=\"item square\"><div class=\"title\">" + title + "</div><div class=\"data " + uid + "\">no values</div></div>";
    }

     /* Template for blocks:
     *  input: data: gets rendered as html
     */
  var type = {};
  type.LD35 = function (data) {
    return "<div class=\"celsius\">" + data.celsius + "</div><div class=\"voltage\">" + data.voltage + "</div>"
  }
