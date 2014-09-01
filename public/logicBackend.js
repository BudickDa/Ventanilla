/*start when dom is ready*/
$(document).ready(function(){
    jsPlumb.ready(function() {
      /*paint available blocks*/
      for(i in blockTemplates){
        var menueBlock = new blockTemplates[i]();
        $("#blockStorage").append(menueBlock.backendMenue);
      }
      return initBackend();
    });
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
      var uid = Math.floor(new Date().getTime());
      var hardware = ui.helper.context.dataset.hardware;
      var system = ui.helper.context.dataset.system;
      var name = ui.helper.context.dataset.name;
      var type = ui.helper.context.dataset.type;
      var unique = ui.helper.context.dataset.unique;
      var pins = JSON.parse(ui.helper.context.dataset.pins);
      //set uid and pid to each pin
      for(i in pins){
        pins[i].uid = uid;
        pins[i].pid = uid+i;
      }

      //uid, position, type, name, system, hardware, input
      if (type === "Sensor") {
        var pin = "A0";
        var freq = 250;
        var treshold = 1;
        var block = new Block(uid, ui.position, type, name, system, new Sensor(pin, freq, treshold),[],unique,pins);
      } else if (type === "ArduinoUno") {
        var port = ui.helper.context.dataset.port;
        var block = new Block(uid, ui.position, type, name, system, new ArduinoUno(port),[],unique,pins);
      } else if (type === "Ui") {
        var port = ui.helper.context.dataset.port;
        var block = new Block(uid, ui.position, type, name, system, new Ui(),[],unique,pins);
      } else if (type === "Logic") {
        var logicName = ui.helper.context.dataset.name;
        var block = new Block(uid, ui.position, type, name, system, new Logic(logicName),[],unique,pins);
      } else if (type === "Api") {
        var block = new Block(uid, ui.position, type, name, system, new Api(),[],unique,pins);
      }
      blocks[uid] = block;
      return createBlock(block,newBlock);
    }
  });

  return load(loadBlocks);
}

function initUi() {
  $("#sketch").on("click", ".deleteButton", function(){
    deleteBlock($(this).parent().data("uid"));
  });
}

function createBlock(block, cb) {
  $("#sketch").append(backendOuter(block));
  $.post("/registerBlock", {
    block: block,
  }, function (err) {
    if (err) {
      log(err);
    }
  });
  log("Created Block " + block.uid);
  if(cb!==undefined){
    return cb(block);
  }else{
    return save(blocks,relations);
  }
}




