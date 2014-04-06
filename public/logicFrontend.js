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
  for(i in uiBlock.input){
    registerRoute(blocks[blocks[uiBlock.input[i]].uid]);
  }
}

function registerRoute(block) {
  $("#display").append(square("Temperature", "uid" + block.uid));
  return subscribeToBlock(block.uid,block.name);
}

function subscribeToBlock(uid,name) {
  log("Subscribe to socket " + uid);
  io.on("uid" + uid, function (data) {
    $(".data.uid" + uid).html(blockTemplateFrontend[name](data));
  });
}









