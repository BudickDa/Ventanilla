var uiConfig = {

}
var wires = [];
var containers = [];
var Y = YUI({filter:'raw'});

function initWireIt(cb) {
  Y.use('bezier-wire', 'container', 'image-container', function(Y) {
    layer = Y.one('#sketch');
    myGraphic = new Y.Graphic();
    myGraphic.render("#sketch");
    return cb();
  });
}

function createBlocks(){

  containers[0] = createContainer({name:"LD35",position:[300,150]});
  containers[1] = createContainer({name:"Ui",position:[850,150]});

  //wires[0] = connect(containers[0].item(1), containers[1].item(0));

};

function connect(src,tgt){
  return sketch.addShape({
     type: wireIntance.BezierWire,
     stroke: {
         weight: 4,
         color: "rgb(173,216,230)"
     },
     src: src,
     tgt: tgt
  });
}

function createContainer(block){
    var c = new Y.Container({
      children: [
        { align: {points:["tl", "lc"]} },
        { align: {points:["tl", "rc"]} }
      ],
      width: 300,
      height: 400,
      render: layer,
      xy: block.position,
      headerContent: block.name
  });
  return c;
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
  }
  return save(blocks,relations);
}





