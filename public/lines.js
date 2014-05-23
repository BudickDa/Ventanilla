var containers = {};
var Y = YUI({filter:'raw'});

function initWireIt(cb) {
  Y.use('layer','bezier-wire', 'inout-container', 'image-container', function(Y) {
    layer = new Y.Layer({
      render: Y.one('#sketch')
    });

    myGraphic = new Y.Graphic();
    myGraphic.render("#sketch");

    return cb();
  });
}

function createBlocks(b,r){
  blocks = b;
  for(i in b){
    if(b[i].type!=="Sensor"&&b[i].type!=="Actor"){
      createContainer(blocks[i]);
      updateBlock(blocks[i]);
    }
  }
  for (i in b) {
    if(b[i].type==="Sensor"||b[i].type==="Actor"){
      createContainer(blocks[i]);
      updateBlock(blocks[i]);
    }
  }
  return connectBlocks(r);
};


function connectBlocks(r){
  relations = r;
  for(i in r){
    connect(r[i].source.source,r[i].target.target);
  }
}

function connect(src,tgt){
  var w = myGraphic.addShape({
    type: Y.BezierWire,
    stroke: {
      weight: 2,
      color: "rgb(173,216,230)"
    },
    src: containers[src].item(1),
    tgt: containers[tgt].item(1)
  });
}

function deleteConnections(id){
  delete relations[id];
}

function createContainer(block){
  var c = new Y.Container({
    children: [
                { align: {name:"foobar"+block.uid,points:["tl", "lc"]}, groups:["Celsius"] },
                { align: {name:"foobar"+block.uid,points:["tl", "rc"]}, groups:["Celsius"] }
              ],
    width: 300,
    height: 400,
    xy: [block.position.left,block.position.top],
    render: layer,
    headerContent: block.name,
    bodyContent: blockTemplates.Ui(block)
  });
  c.name = block.uid;
  //._dragged = function(){alert("adsffkl'jgre jklh  fghds")};
  return containers[block.uid] = c;
}


/* In this shitty and bad documented framework wireit does the connect event not longer exist.
 * So I take the event, if two containers are connected. This fires an event for every container, I take the two events in a buffer and create a connection.
 * After that, cBuffer is reset to wait for the next two events...
 * This really sucks and is another reason to migrage away from wireit. But jsPlumb sucks too and so there are no more alternatives under MIT License. FML!
 * */
var cBuffer = [];
function connectBuffer(container){
  if(cBuffer.length<1){
    cBuffer.push(container);
  }else{
    var tmp = cBuffer[0];
    console.log(tmp);
    cBuffer = [];
    var id =createWireId(tmp, container);
    //source, sourcePin, sourceType, target, targetPin, targetType
    relations[id] = new relation(tmp.name,1, "celsius", container.name, 0, "celsius");
    console.log(container.name);
    blocks[container.name].input[id] = new Input(tmp.name);
    return save(blocks,relations)
  }
}

var dcBuffer = [];
function disconnectBuffer(container){
  if(dcBuffer.length<1){
    dcBuffer.push(container);
  }else{
    var tmp = dcBuffer[0];
    dcBuffer = [];
    var id =createWireId(tmp, container);
    //source, sourcePin, sourceType, target, targetPin, targetType
    delete relations[id];
    delete blocks[container.name].input[id];
    return save(blocks,relations)
  }
}


/*
 * Helper Functions...
 * */
function createWireId(src,tgt){
   return src.name + "_" + tgt.name;
}



