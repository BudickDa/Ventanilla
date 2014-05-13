function paintBlocks() {
  YUI({filter: 'raw'}).use('arrow-wire', 'inout-container', 'form-container', 'inputex-group', 'inputex-email', 'inputex-select', 'inputex-checkbox', 'inputex-radio', 'inputex-list', 'inputex-url', 'json', function(Y) {

    var layerEl = Y.one('#sketch');

    var mygraphic = new Y.Graphic({render: "#sketch"});

    c1 = new Y.InOutContainer({
      children: [
        {
          align: {points:["tl", "lc"]},
          dir: [-1,0],
          groups: ['in'],
          graphic: mygraphic
        },
        {
          align: {points:["tl", "rc"]}, dir: [1, 0],
          groups: ['object'],
          graphic: mygraphic
        }
      ],

      inputs: ['alright','sound in'],

      ouputs: ['result','error'],

      render: layerEl,
      xy: [300,150],
      headerContent: 'Awesome Module',

      resizable: false

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





