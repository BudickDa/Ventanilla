/*start when dom is ready*/
$(document).ready(function(){
  /*paint available blocks*/
  log(blockTemplates);
  for(i in blockTemplates){
    var menueBlock = new blockTemplates[i]();
    $("#blockStorage").append(menueBlock.backendMenue);
  }
  return initWireIt(initBackend);
});
function initBackend() {
  /*Make points from menu dragable*/
  $("#blockStorage li").draggable({
    appendTo: "body",
    helper: "clone"
  });
  /*this is executed when block is dropped into sketch*/
  $("#sketch").droppable({
    accept: "#blockStorage li",
    drop: function (event, ui) {
      var uid = Math.floor(new Date().getTime()+Math.random(1337));
      var hardware = ui.helper.context.dataset.hardware;
      var system = ui.helper.context.dataset.system;
      var name = ui.helper.context.dataset.name;
      var type = ui.helper.context.dataset.type;
      var unique = ui.helper.context.dataset.unique;
      var pins = JSON.parse(ui.helper.context.dataset.pins);
      //uid, position, type, name, system, hardware, input
      if (type === "Sensor") {
        var pin = "A0";
        var freq = 250;
        var treshold = 1;
        var block = new Block(uid, ui.position, type, name, system, new Sensor(pin, freq, treshold),{},unique,pins);
      } else if (type === "ArduinoUno") {
        var port = ui.helper.context.dataset.port;
        var block = new Block(uid, ui.position, type, name, system, new ArduinoUno(port),{},unique,pins);
      } else if (type === "Ui") {
        var port = ui.helper.context.dataset.port;
        var block = new Block(uid, ui.position, type, name, system, new Ui(),{},unique,pins);
      } else if (type === "Logic") {
        var logicName = ui.helper.context.dataset.name;
        var block = new Block(uid, ui.position, type, name, system, new Logic(logicName),{},unique,pins);
      }
      blocks[uid] = block;
      return createBlock(block);
    }
  });

  return load(blocks,relations,paintUi);
}

function paintUi(b,r) {
  //write render the blocks from the last session
  //Interfaces and logic then everything else have an higher priority
  createBlocks(b,r);
}

function initUi() {
  /*
  This has to go into lines at blocks...
  $("#sketch").on("click", ".deleteButton", function(){
    deleteBlock($(this).parent().data("uid"));
  });

  $("#sketch").on("click", ".deleteButtonUnique", function(){
    if(printWarning("If you delete this block, you have to restart your application. Do you want to continue?")){
      deleteBlock($(this).parent().data("uid"));
    }
  });*/
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
  save(blocks,relations);
  return createChildren(block);
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




