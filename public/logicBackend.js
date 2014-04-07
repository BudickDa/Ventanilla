/*global instance of jsPlumb (JS-Module for drawing lines)*/
var instanceJsP = {};

function initBackend() {
  return load(paintUi, initUi);
}

function paintUi(cb) {
  //write render the blocks from the last session
  //Interfaces and logic then everything else have an higher priority
  for(i in blocks){
    if(blocks[i].type!=="Sensor"&&blocks[i].type!=="Actor"){
      renderBlock(blocks[i]);
      createBlock(blocks[i], cb);
    }
  }
  for (i in blocks) {
    if(blocks[i].type==="Sensor"||blocks[i].type==="Actor"){
      renderBlock(blocks[i]);
      createBlock(blocks[i], cb);
    }
  }
  return cb();
}

function initUi() {
  $("#blockStorage li").draggable({
    appendTo: "body",
    helper: "clone"
  });
  $("#sketch").droppable({
    accept: "#blockStorage li",
    drop: function (event, ui) {
      var uid = Math.floor(new Date().getTime()+Math.random(1337));
      console.log(uid);
      var hardware = ui.helper.context.dataset.hardware;
      var system = ui.helper.context.dataset.system;
      var name = ui.helper.context.dataset.name;
      var type = ui.helper.context.dataset.type;
      //uid, position, type, name, system, hardware, input
      if (type === "Sensor") {
        var pin = "A0";
        var freq = 250;
        var treshold = 1;
        var block = new Block(uid, ui.position, type, name, system, new Sensor(pin, freq, treshold),[]);
      } else if (type === "ArduinoUno") {
        var port = ui.helper.context.dataset.port;
        var block = new Block(uid, ui.position, type, name, system, new ArduinoUno(port),[]);
      } else if (type === "Ui") {
        var port = ui.helper.context.dataset.port;
        var block = new Block(uid, ui.position, type, name, system, new Ui(),[]);
      } else {
        log("Error: Type is not supported")
        return initLines();
      }
      blocks[uid] = block;
      createBlock(block);
      return renderBlock(block,initJsPlumb);
    }
  });
  return initJsPlumb();
}

function renderBlock(block,cb) {
  $("#sketch").append(blockTemplateBackend[block.name](block.uid));
  $("#uid" + block.uid).css(block.position).draggable({
    scroll: false,
    drag: function () {
      instanceJsP.repaintEverything();
    },
    stop: dragged
  });
  save(blocks,relations);
  if(cb!==undefined){
    return cb();
  }
}

function dragged(event, ui) {
  log("Block was moved");
  blocks[ui.helper.context.dataset.uid].position = ui.position;
  save(blocks,relations);
  return instanceJsP.repaintEverything();
}




function createBlock(block, cb) {
  $.post("/registerBlock", {
    block: block,
  }, function (err) {
    if (err) {
      log(err);
    } else {
      log("Created Block " + block.uid);
      return cb(block.uid);
    }
  });
}

function updateBlock(block){
  $.post("/registerBlock", {
    block: block,
  }, function (err) {
    if (err) {
      log(err);
    } else {
      log("Updated Block " + block.uid);
      return save(blocks,relations);
    }
  });
}



function repaint() {
  jsPlumb.bind("ready", function () {
    instanceJsP = drawLines();
  });
}
function initJsPlumb() {
  jsPlumb.bind("ready", function () {
    log("Initilize JsPlumb")
    instanceJsP = drawLines();
    return drawConnections(instanceJsP)    
  });
}
function drawConnections(instance){
    /*empty relations array to avoid data duplication*/
    var tmp = relations;
    relations = []; /*paint connections*/
    for (i in tmp) {
      log("Paint connection: " + i);
log({
        source: "uid" + tmp[i].source,
        target: "uid" + tmp[i].target
      });
      //setInput(tmp[i].source,tmp[i].target);
      instance.connect({
        source: "uid" + tmp[i].source,
        target: "uid" + tmp[i].target
      });
    }
}

/*draw lines*/
var drawLines = function () {
  log(blocks);
  // setup some defaults for jsPlumb.  
  var instance = jsPlumb.getInstance({
    Endpoint: ["Dot",
    {
      radius: 2
    }],
    HoverPaintStyle: {
      strokeStyle: "#1e8151",
      lineWidth: 2
    },
    ConnectionOverlays: [
  ["Arrow",
    {
      location: 1,
      id: "arrow",
      length: 14,
      foldback: 0.8
    }],
          ["Label",
    {
      label: "FOO",
      id: "label",
      cssClass: "aLabel"
    }]
  ],
    Container: "sketch"
  });
  //get blocks from UI into global windows object
  windows = jsPlumb.getSelector("#sketch .w");
  instance.bind("click", function (c) {
    log(c);
    instance.detach(c);
  });
  instance.bind("connection", function (info) {
    blocks[$(info.target).data('uid')].input.push($(info.source).data('uid'));
    relations.push({
      source: $(info.source).data('uid'),
      target: $(info.target).data('uid')
    });
    return updateBlock(blocks[$(info.source).data('uid')]);
  });
  instance.doWhileSuspended(function () {
    instance.makeSource(windows, {
      filter: ".ep",
      // only supported by jquery
      anchor: "Continuous",
      connector: ["StateMachine",
      {
        curviness: 20
      }],
      connectorStyle: {
        strokeStyle: "#5c96bc",
        lineWidth: 2,
        outlineColor: "transparent",
        outlineWidth: 4
      },
      maxConnections: 5,
      onMaxConnections: function (info, e) {
        alert("Maximum connections (" + info.maxConnections + ") reached");
      }
    });

    instance.makeTarget(windows, {
      dropOptions: {
        hoverClass: "dragHover"
      },
      anchor: "Continuous"
    });
  });
  return instance;
}

/*start when dom is ready*/
$(document).ready(initBackend);
