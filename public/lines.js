var uiConfig = {

}

function paintBlocks() {
  YUI({filter: 'raw'}).use('arrow-wire', 'inout-container', 'form-container', 'inputex-group', 'inputex-email', 'inputex-select', 'inputex-checkbox', 'inputex-radio', 'inputex-list', 'inputex-url', 'json', function(Y) {
    blockLayer = Y.one('#sketch');

    sketch = new Y.Graphic({render: "#sketch"});

    c1 = new Y.InOutContainer({
      children: [
        {
          align: {points:["tl", "lc"]},
          dir: [-1,0],
          groups: ['object'],
          graphic: sketch
        },
        {
          align: {points:["tl", "rc"]}, dir: [1, 0],
          groups: ['object'],
          graphic: sketch
        }
      ],
      inputs: ['port'],

      ouputs: ['celsius','voltage'],

      render: blockLayer,
      xy: [300,150],
      headerContent: 'LD35',
    });

    c2 = new Y.InOutContainer({
      children: [
        {
          align: {points:["tl", "lc"]},
          dir: [-1,0],
          groups: ['object'],
          graphic: sketch
        }
      ],

      inputs: ['boxes'],

      render: blockLayer,
      xy: [400,250],
      headerContent: 'Ui',
    });

    //connect blocks
    var wire = sketch.addWire({
       type: Y.StraightWire,
       stroke: {
           weight: 4,
           color: "rgb(173,216,230)"
       },
       src: c1,
       tgt: c2
    });
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
  }
  return save(blocks,relations);
}





