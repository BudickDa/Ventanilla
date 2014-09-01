var endpointOptions = function(isSource,isTarget){
  return {
    anchor:"Center",
    endpointStyle: { width:15, height:15, fillStyle: "#878b8f" },
    endpoint:"Rectangle",
    paintStyle:{ width:15, height:15, fillStyle: "#878b8f" },
    isSource:isSource,
    connectorStyle: {strokeStyle: "#878b8f"},
    isTarget: isTarget
  };
};

function loadBlocks(blocks,relations){
  jsPlumb.setContainer($("#sketch"));
  for(i in blocks){
    createBlock(blocks[i],newBlock);
  }
  return connectBlocks(relations);
}

function connectBlocks(relations){
  for(i in relations){
    jsPlumb.connect({source:"pid"+relations[i].source.pid,target:"pid"+relations[i].target.pid},endpointOptions(true,false));
  }
  save(blocks,relations);
  //set events
  return jsPlumb.bind("connection", function(info,event){
    onConnect(info);
    return jsPlumb.bind("connectionDetached", function(info,event){
      return onDisconnect(info);
    });
  });
}


function onDisconnect(info){
  log("Block gets disconnected. Info:");
  log(info);
  var sourcePid = info.source.dataset.pid;
  var targetPid = info.target.dataset.pid;
  var targetBlock = blocks[info.target.dataset.uid];
  for(i in relations){
    if(relations[i].source.pid == sourcePid && relations[i].target.pid == targetPid){
      relations.splice(i,1);
    }
  }
  for(i in targetBlock.input){
    //test if block was deleted before disconnection
    if(targetBlock === undefined){
      //nothing to do here..., I guess...
    }
    else if(targetBlock.input[i].pid==sourcePid){
      targetBlock.input.splice(i);
    }
  }
  //registerBlock(targetBlock);
  return registerBlock(targetBlock,newBlock);
}



function onConnect(info){
  var source = new Pin(info.source.dataset.uid,info.source.dataset.pid,info.source.dataset.type,info.source.dataset.direction);
  var target = new Pin(info.target.dataset.uid,info.target.dataset.pid,info.target.dataset.type,info.target.dataset.direction);
  return createConnection(source,target);
}

function createConnection(source,target){
  try{
    relations.push(new Relation(source, target));
  }catch(e){
    log("Lines.js - Line 45: "+e);
  }
  try{
    blocks[target.uid].input.push(source);
  }catch(e){
    log("Lines.js - Line 50: "+e);
  }
  return createBlock(blocks[target.uid],newBlock);
}

function newBlock(block){
  //make all the input pins to endpoints
  //we should do it via the pids, but later, no time now....
  $("#uid"+block.uid+" .input .pin").each(function(){
    jsPlumb.addEndpoint($(this), { anchor:"Center" }, endpointOptions(false,true));
  });

  //make all the output pins to endpoints
   $("#uid"+block.uid+" .output .pin").each(function(){
     jsPlumb.addEndpoint($(this), { anchor:"Center" }, endpointOptions(true,false));
  });

  //make block draggable
  jsPlumb.draggable("uid"+block.uid,{
    drag: function (event, ui) {
      block.position = ui.position;
      return save(blocks,relations);
    }
  });

  return save(blocks, relations);
}
