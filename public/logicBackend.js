function initBackend() {
  load(paintUi, initUi);
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

  return paintBlocks();
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
    $("#blockStorage").append(menueBlock.backendMenue);
  }
  return initBackend()
});
