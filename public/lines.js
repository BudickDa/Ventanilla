var instance = {};
var windows = {};
var arrowConfig = {
    filter: ".ep",
    connector: [ "Straight", { curviness: 0 } ],
    startpoints:"Rectangle",
    endpoint:"Rectangle",
    paintStyle:{ fillStyle:"gray" },
    Container: "sketch"
  };
function initJsPlumb(paintUi, initUi) {
  jsPlumb.bind("ready", function () {
    log("Initilize JsPlumb")
    windows = jsPlumb.getSelector("#sketch .w");
    instance = jsPlumb.getInstance(arrowConfig);
  /*Click connection deletes connection*/
  instance.bind("click", function (c) {
    for(i in relations){
      if(relations[i].source === $("#"+c.sourceId).data("uid") && relations[i].target === $("#"+c.targetId).data("uid")){
        relations.splice(i,1);
        for(j in blocks[$("#"+c.targetId).data("uid")].input){
          if(blocks[$("#"+c.targetId).data("uid")].input[j] === $("#"+c.sourceId).data("uid")){
            blocks[$("#"+c.targetId).data("uid")].input.splice(j,1);
          }
        }
        instance.detach(c);
        return save(blocks,relations);
      }
    }
  });

  /*This is executed, when connection is made*/
  instance.bind("connection", function (info) {
    log("Connect " + $(info.source).data('uid') + " with " + $(info.target).data('uid'));
    relations.push(new relation($(info.source).data('uid'),$(info.target).data('uid')));
    blocks[$(info.target).data('uid')].input.push($(info.source).data('uid'));
    return updateBlock(blocks[$(info.target).data('uid')]);
  });
    return load(paintUi, initUi,drawConnections);
  });
}

function drawConnections(){
  log("Paint loaded connections");
  /*empty relations array to avoid data duplication*/
  var tmp = relations;
  relations = [];
  /*paint connections*/
  for (i in tmp) {
    log("Line between " + tmp[i].source + " and " + tmp[i].target);
    var relationship = new relation("uid" + tmp[i].source, "uid" + tmp[i].target);
    instance.connect(relationship,arrowConfig);
  }

  return save(blocks,relations);
}


function redrawLines(){
  log("Redraw Lines...");
  /*get new elements*/
  windows = jsPlumb.getSelector("#sketch .w");
  instance.makeSource(windows, arrowConfig);
  instance.makeTarget(windows, arrowConfig);

  return instance;
}




