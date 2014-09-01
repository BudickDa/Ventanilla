var ui;
var io = io.connect();
var blockUis = {};

//init UI
$(document).ready(function () {
  ui = $("#data").data("ui");
  //io.emit("block");
  initVentanilla();
  return setInterval(initVentanilla,2000);
});

function initVentanilla() {
  loadUiBlock(ui, function(block,blocks){
    return paintUi(block,blocks);
  });
}

function paintUi(block,blocks) {
  log("Blocks connected to Ui:");
  for(i in block.input){
    log(block.input[i]);
    registerRoute(block.input[i],blocks);
  }
}

function registerRoute(pin,blocks) {
  if($("#upper"+pin.pid).length===0){
    $("#display").append(square(blocks[pin.uid].name, pin));
    return subscribeToBlock(pin,blocks);
  }
}

function subscribeToBlock(pin,blocks) {
  io.on("pid" + pin.pid, function (data) {
    $(".data.pid" + pin.pid).html(data);
  });
}

function getApi(){

}











