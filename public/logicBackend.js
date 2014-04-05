    /*global instance of jsPlumb (JS-Module for drawing lines)*/
    var instanceJsP;
    /*comtains all elements in #sketch with .w
    * Is initilized in initLines()
    */
    var windows;
    /*contains relations between blocks in a relation object*/
    var relations = [];
    /*here all the registered blocks are saved*/
    var blocks = [];


      var blockTemplate = {};
      //Template for LD35
      blockTemplate.LD35 = function(uid,index){return "<div class=\"block w\" data-index=\""+index+"\" data-uid=\""+uid+"\" id=\"uid"+uid+"\"><span class=\"title\">LD35</span><div class=\"ep\"></div></div>";};
      //Template for UI
      blockTemplate.UI = function(uid,index){return "<div class=\"block w\" data-index=\""+index+"\" data-uid=\""+uid+"\" id=\"uid"+uid+"\"><span class=\"title\">UI</span><span class=\"link\"><a href=\"/ui/"+uid+"\" title=\"zum Frontend\">go to Frontend</a><div class=\"ep\"></div></div>";};
      //Template for arduino board
      blockTemplate.ArduinoUno = function(uid,index){return "<div class=\"block w\" data-uid=\""+uid+"\" data-index=\""+index+"\" id=\"uid"+uid+"\"><span class=\"title\">Arduino Board</span><div class=\"ep\"></div></div>";};
      //todo: comment




      function initBackend(){
        load(paintUi,initUi);
        return save();
      }
      function paintUi(cb){
        //write render the blocks from the last session
        for(i in blocks){
          renderBlock(blocks[i],i);
        }
        return cb();
      }
      function initUi(){
        $("#blockStorage li").draggable({
          appendTo: "body",
          helper: "clone"
        });
        $("#sketch").droppable({
          accept: "#blockStorage li",
          drop: function(event,ui){
            var uid = blocks.length+new Date().getTime();
            var hardware = ui.helper.context.dataset.hardware;
            var system = ui.helper.context.dataset.system;
            var name = ui.helper.context.dataset.name;
            var type = ui.helper.context.dataset.type;
            //uid, position, type, name, system, hardware, input
            if(type==="sensor"){
              //pin,freq,treshold
              var pin = "A0";
              var freq = 250;
              var treshold = 1;
              var block = new Block(uid,ui.position,type,name,system,new Sensor(pin,freq,treshold));
            } else if(type==="interface"){
              var port = ui.helper.context.dataset.port;
              var block = new Block(uid,ui.position,type,name,system,new Interface(system,port));
            }else{
              log("Error: Type is not supported")
              return initLines();
            }

            blocks.push(block);
            var element = renderBlock(block);
            save();
            return initLines();
          }
        });
        /*init trash*/
        $("#trash").droppable({
          accept: "#sketch .w.block",
          drop: function(event,ui){
            var uid = ui.helper.context.dataset.hardware;
            blocks[uid] = {};
            $("#sketch #uid"+uid).remove();
            log("Block "+uid+" was deleted")
            save();

          }
        });
        jsPlumb.bind("ready", function() {
          initLines();
        });
      }

      function renderBlock(block,index){
        $("#sketch").append(blockTemplate[block.name](block.uid,index));
        $("#uid"+block.uid).css(block.position).draggable({
          scroll: false,
          drag: function(){
            instanceJsP.repaintEverything();
          },
          stop: dragged
        });
        return $("#uid"+block.uid);
      }

      function dragged(event,ui){
        log("Block was moved");
        blocks[ui.helper.context.dataset.index].position = ui.position;
        save();
        return instanceJsP.repaintEverything();
      }

      function save(){
        log("Save to local storage");
        localStorage.blocks = JSON.stringify(blocks);
        localStorage.relations = JSON.stringify(relations);
      }

      function load(cb,cb2){
        if(localStorage.relations!==undefined){
          relations = JSON.parse(localStorage.relations);
        }
        if(localStorage.blocks!==undefined){
          var blockData = JSON.parse(localStorage.blocks);
          for(i in blockData){
            if(blockData[i].input===undefined){
              var input = [];
            }else{
              var input = blockData[i].input;
            }
            blocks.push(new Block(blockData[i].uid,blockData[i].position,blockData[i].type,blockData[i].name,blockData[i].system,blockData[i].hardware,input));
          }
        }
        log("Data was loaded");
        return cb(cb2);
      }



      function deleteAll(){
        blocks = [];
        $("#sketch").html("");
        log("Delete all...");
        return save();
      }

      
    
      function repaint(i){
        i.repaintEverything();
      }

      $(document).ready(initBackend);




      function setInput(uidSource,uidTarget){
        for(i in blocks){
          if(blocks[i].uid === uidTarget){
            blocks[i].input.push(uidSource);
          }
        }
      }
      function initLines(){
        log("Initilize connections...")
        instanceJsP = drawLines();

        /*empty relations array to avoid data duplication*/
        var tmp = relations;
        relations = [];
        /*paint connections*/
        for(i in tmp){
          log("Paint connetion: "+i);
          //setInput(tmp[i].source,tmp[i].target);
          instanceJsP.connect({ source: "uid"+tmp[i].source, target: "uid"+tmp[i].target});
        }
      }

/*draw lines*/
var drawLines = function(){
  // setup some defaults for jsPlumb.  
    var instance = jsPlumb.getInstance({
    Endpoint : ["Dot", {radius:2}],
    HoverPaintStyle : {strokeStyle:"#1e8151", lineWidth:2 },
    ConnectionOverlays : [
      [ "Arrow", { 
        location:1,
        id:"arrow",
                  length:14,
                  foldback:0.8
      } ],
              [ "Label", { label:"FOO", id:"label", cssClass:"aLabel" }]
    ],
    Container:"sketch"
  });
  //get blocks from UI into global windows object
  windows = jsPlumb.getSelector("#sketch .w");
  instance.bind("click", function(c) {
    log(c);
    instance.detach(c); 
  });
  instance.bind("connection", function(info) {
    info.connection.getOverlay("label").setLabel(info.connection.id);
    setInput($(info.source).data('uid'),$(info.target).data('uid'));
    relations.push({source: $(info.source).data('uid'), target: $(info.target).data('uid')});
    return save();
 });
  instance.doWhileSuspended(function() {
    instance.makeSource(windows, {
      filter:".ep",        // only supported by jquery
      anchor:"Continuous",
      connector:[ "StateMachine", { curviness:20 } ],
      connectorStyle:{ strokeStyle:"#5c96bc", lineWidth:2, outlineColor:"transparent", outlineWidth:4 },
      maxConnections:5,
      onMaxConnections:function(info, e) {
        alert("Maximum connections (" + info.maxConnections + ") reached");
      }
    });            

    instance.makeTarget(windows, {
      dropOptions:{ hoverClass:"dragHover" },
      anchor:"Continuous"
    });
  });

  return instance;
}
