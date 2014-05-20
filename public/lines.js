var uiConfig = {

}
var wires = [];
var containers = [];
function paintBlocks() {
  YUI({filter: 'raw'}).use('arrow-wire', 'inout-container', 'form-container', 'inputex-group', 'inputex-email', 'inputex-select', 'inputex-checkbox', 'inputex-radio', 'inputex-list', 'inputex-url', 'json', function(Y) {
    blockLayer = Y.one('#sketch');
    sketch = new Y.Graphic({render: "#sketch"});

    containers.push(createContainer(Y));
    containers.push(createContainer(Y));


    wires.push(connect(Y, containers[0].item(1), containers[1].item(0)));
  });
}

function connect(Y,t1,t2){
  return sketch.addShape({
       type: Y.BezierWire,
       stroke: {
           weight: 4,
           color: "rgb(173,216,230)"
       },
       src: t1,
       tgt: t2
    });
}

function createContainer(Y,block){
  var c = new Y.InOutContainer({
    children: [
      { align: {points:["tl", "lc"]} },
      { align: {points:["tl", "rc"]} }
    ],
    width: 350,
    height: 200,
    render: blockLayer,
    xy: [300,150],
    headerContent: 'LD35',
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





