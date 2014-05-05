var ui;
var io = io.connect();

//init UI
$(document).ready(function () {
  ui = $("#data").data("ui");
  io.emit("block");
  initVentanilla();
  return setInterval(initVentanilla,1000);
});

function initVentanilla() {
  loadUiBlock(ui, function(block,blocks){
    //get input of block of UI
    return paintUi(block,blocks);
  });
}

function paintUi(block,blocks) {
  for(i in block.input){
    registerRoute(block.input[i],blocks[block.input[i]].name);
  }
}

function registerRoute(uid,name) {
  if($(".uid"+uid).length===0){
    $("#display").append(square(name, "uid" + uid));
    return subscribeToBlock(uid,name);
  }
}

function subscribeToBlock(uid,name) {
  log("Subscribe to socket " + uid);
  var blockTemplate = new blockTemplates[name](uid);
  io.on("uid" + uid, function (data) {
    $(".data.uid" + uid).html(blockTemplate.frontendTemplate(data));
  });
}











