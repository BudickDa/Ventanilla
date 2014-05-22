var uiConfig = {

}

var blocks, relations;

var wires = [];
var containers = {};
var Y = YUI({filter:'raw'});

function initWireIt(cb) {
  Y.use('layer','bezier-wire', 'inout-container', 'image-container', function(Y) {
    layer = new Y.Layer({
      render: Y.one('#sketch')
    });
    console.log(layer);
    myGraphic = new Y.Graphic();
    myGraphic.render("#sketch");

    layer.on('addChild',function(e){
      console.log(e);
    });

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
    connect(r[i].source,r[i].target);
  }
}

function connect(src,tgt){
  console.log(containers[src]);
  console.log(containers[tgt]);
  var w = myGraphic.addShape({
    type: Y.BezierWire,
    stroke: {
      weight: 2,
      color: "rgb(173,216,230)"
    },
    src: containers[src].item(1),
    tgt: containers[tgt].item(1)
  });
  return wires.push(w);
}

function createContainer(block){
  var c = new Y.Container({
    children: [
                { align: {points:["tl", "lc"]}, id: block.uid, label: "Input" },
                { align: {points:["tl", "rc"]}, id: block.uid, label: "Output"  }
              ],
    inputs: ['integer'],
    outputs: ['integer'],
    width: 300,
    height: 400,
    xy: [block.position.left,block.position.top],
    render: layer,
    headerContent: block.name,
  });
  c.name = block.uid;
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
    cBuffer.push(container.name);
  }else{
    console.log(blocks[container.name]);
    blocks[container.name].input.push(cBuffer[0]);
    relations.push(new relation(cBuffer[0],container.name));
    cBuffer = [];
    return save(blocks,relations)
  }
}


