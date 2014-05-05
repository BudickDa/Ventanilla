function initBackend() {
  initJsPlumb(paintUi, initUi);
}

function paintUi(initUi) {
  //write render the blocks from the last session
  //Interfaces and logic then everything else have an higher priority
  for(i in blocks){
    if(blocks[i].type!=="Sensor"&&blocks[i].type!=="Actor"){
      renderBlock(blocks[i], repaint);
      updateBlock(blocks[i]);
    }
  }
  for (i in blocks) {
    if(blocks[i].type==="Sensor"||blocks[i].type==="Actor"){
      renderBlock(blocks[i], repaint);
      updateBlock(blocks[i]);
    }
  }
  return initUi(drawConnections);
}

function initUi() {
  $("#blockStorage li").draggable({
    appendTo: "body",
    helper: "clone"
  });

  $("#sketch").on("click", ".deleteButton", function(){
    deleteBlock($(this).parent().data("uid"));
  });

  $("#sketch").on("click", ".deleteButtonUnique", function(){
    if(printWarning("If you delete this block, you have to restart your application. Do you want to continue?")){
      deleteBlock($(this).parent().data("uid"));
    }
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
      var unique = ui.helper.context.dataset.unique;
      //uid, position, type, name, system, hardware, input
      if (type === "Sensor") {
        var pin = "A0";
        var freq = 250;
        var treshold = 1;
        var block = new Block(uid, ui.position, type, name, system, new Sensor(pin, freq, treshold),[],unique);
      } else if (type === "ArduinoUno") {
        var port = ui.helper.context.dataset.port;
        var block = new Block(uid, ui.position, type, name, system, new ArduinoUno(port),[],unique);
      } else if (type === "Ui") {
        var port = ui.helper.context.dataset.port;
        var block = new Block(uid, ui.position, type, name, system, new Ui(),[],unique);
      } else {
        log("Error: Type is not supported")
        return initLines();
      }
      blocks[uid] = block;
      createBlock(block);
      return renderBlock(block,repaint);
    }
  });
  return drawConnections();
}

function renderBlock(block,cb) {
  var blockTemplate = new blockTemplates[block.name](block);
  $("#sketch").append(blockTemplate.backendTemplate);

  $("#uid" + block.uid).css(block.position).draggable({
    scroll: false,
    stop: dragged
  });
  
  if(cb!==undefined){
    setTimeout(function(){
        return cb();
    },1000);
  }
  return save(blocks,relations);
}

function dragged(event, ui) {
  log("Block was moved");
  blocks[ui.helper.context.dataset.uid].position = ui.position;
  save(blocks,relations);
  return instance.repaintEverything();
}




function createBlock(block, cb) {
  $.post("/registerBlock", {
    blocks: [block],
  }, function (err) {
    if (err) {
      log(err);
    } else {
      log("Created Block " + block.uid);
      if(cb!==undefined){
        return cb(block.uid);
      }
    }
  });
}

function updateBlock(block){
  $.post("/registerBlock", {
    blocks: [block],
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
  log("Repaint view...")
  redrawLines();
}

/*start when dom is ready*/
$(document).ready(function(){
  /*paint available blocks*/
  log(blockTemplates);
  for(i in blockTemplates){
    var menueBlock = new blockTemplates[i]();
    $("#blockStorage").append(menueBlock.frontendMenue);
  }
  return initBackend()
});
