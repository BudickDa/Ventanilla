function initJsPlumb(paintUi, initUi) {
  YUI({filter: 'raw'}).use('bezier-wire', 'inout-container', 'form-container', 'inputex-group', 'inputex-email', 'inputex-select', 'inputex-checkbox', 'inputex-radio', 'inputex-list', 'inputex-url', 'json', function(Y) {

  var layerEl = Y.one('#sketch');

  var mygraphic = new Y.Graphic({render: "#sketch"});

  c1 = new Y.InOutContainer({
    children: [
      {
      align: {points:["tl", "lc"]},
      dir: [-1,0],
      groups: ['string'],
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
    xy: [200,100],
    headerContent: 'Awesome Module',
    footerContent: 'not executed'

  });


  c2 = new Y.InOutContainer({
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
    c3 = new Y.FormContainer({
    children: [
        {
            align: {points:["tl", "tc"]},
            dir: [0,-1],
            groups: ['string'],
            graphic: mygraphic
        },
        {
            align: {points:["tl", "bc"]}, dir: [0, 1],
            groups: ['object'],
            graphic: mygraphic
        }
    ],

    render: layerEl,
    xy: [200,100],
    headerContent: 'Awesome Module',
    footerContent: 'not executed',

    fields: [
        {type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }]},
        {label: 'Firstname', name: 'firstname', required: true},
        {label: 'Lastname', name: 'lastname', value:'Dupont'},
        {type:'email', label: 'Email', name: 'email', required: true, showMsg: true},
        {type:'radio', label: 'Happy to be there ?', name: 'happy', display:'vertically', choices:[{value: "y", label:"yes"}, {value:"n", label:"no"}]},
        {type:'boolean', label: 'Favorite colors ?', name: 'yellow', rightLabel:"yellow"},
        {type:'boolean', label: ' ', name: 'blue', rightLabel:"blue"},
        {type:'boolean', label: ' ', name: 'red', rightLabel:"red"}
    ]

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
  }
  return save(blocks,relations);
}


function redrawLines(){
  log("Redraw Lines...");
}




