var uiConfig = {

}
var wireIntance, blockLayer, sketch;
var wires = [];
var containers = [];

function paintBlocks() {
  /*YUI().use('bezier-wire', 'container', 'image-container', function(Y) {
    var l = Y.one('#sketch');
    var s = new Y.Graphic({render: "#sketch"});

    c1 = new Y.Container({
      children: [
        { align: {points:["tl", "lc"]} },
        { align: {points:["tl", "rc"]} }
      ],
      width: 350,
      height: 200,
      render: l,
      xy: [300,150],
      headerContent: 'LD35'
    });

    c2 = new Y.Container({
      children: [
        { align: {points:["tl", "lc"]} },
        { align: {points:["tl", "rc"]} }
      ],
      width: 350,
      height: 200,
      render: l,
      xy: [850,150],
      headerContent: 'Ui'
    });*/


    //return makeYGlobal(Y,s, l);
  YUI().use('bezier-wire', 'container', 'image-container', function(Y) {

    var layerEl = Y.one('#sketch');

    var mygraphic = new Y.Graphic({render: "#sketch"});

    c1 = new Y.Container({
      children: [
        { align: {points:["tl", "tl"]} },
        { align: {points:["tl", "bc"]} }
      ],

      render: layerEl,
      xy: [200,100],
      width: 200,
      height: 100,
      headerContent: 'headerContent',
      bodyContent: 'bodyContent',
      footerContent: 'footerContent'
    });

    c2 = new Y.Container({
      children: [
        {
          align: {points:["tl", "tl"]},
          dir: [-1,-1]
        }
      ],
      render: layerEl,
      xy: [350,200],
      headerContent: 'sample container',
      bodyContent: 'bodyContent'
    });
    c3 = new Y.Container({
      children: Y.ContainerBase.EIGHT_POINTS,
      render: layerEl,
      width: 200,
      height: 100,
      xy: [500,200],
      headerContent: '9 terminals',
      bodyContent: 'bodyContent',
      footerContent: 'footerContent'
    });

    c5 = new Y.ImageContainer({
      children: Y.ContainerBase.EIGHT_POINTS,
      render: layerEl,
      xy: [700,30],
      imageUrl: 'http://www.google.fr/images/logos/ps_logo2.png'
    });


    var wire = mygraphic.addShape({
       type: Y.BezierWire,
       stroke: {
           weight: 4,
           color: "rgb(173,216,230)"
       },
       src: c1.item(1),
       tgt: c2.item(0)
    });
  });
}
/*
function makeYGlobal(Y,s,l){
  sketch = s;
  wireIntance = Y;
  blockLayer = l;
  return test();
}
function test(){

  containers[0] = createContainer();
  containers[1] = createContainer();


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
  return new wireIntance.InOutContainer({
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
}
*/

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





