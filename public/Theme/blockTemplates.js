var blockTemplates = {};

var backendOuter = function(block){
    var uid = block.uid;
    var unique = block.unique;
  var html = "<div class=\"block w\" data-uid=\"" + uid + "\" id=\"uid" + uid + "\" style=\"left:"+block.position.left+"px;top:"+block.position.top+"px\">";
  if(unique==="true"){
    html += "<div class=\"deleteButtonUnique\" data-uid=\"" + uid + "\">X</div>";
  }else{
    html += "<div class=\"deleteButton\" data-uid=\"" + uid + "\">X</div>";
  }
  if(block.name==="Ui"){
    html += "<div class=\"blockBody\"><div class=\"blockName\"><a href=\"/ui/"+block.uid+"\" target=\"_blank\">"+block.name+"</a></div>"+writePins(block.pins,true)+writePins(block.pins,false)+"</div></div>";
  } else{
     html += "<div class=\"blockBody\"><div class=\"blockName\">"+block.name+"</div>"+writePins(block.pins,true)+writePins(block.pins,false)+"</div></div>";
  }

  return html;
}

 /**
        Writes the pins as list. If input is false, it writes all the outputs
        @param pins is an Array of pins that is written as html list.
        @param input is boolean. True: All inputs are written as html. False: All the outputs are written as html. Undefined: Alle Pins are written as html.
        @return string that contains a html list with the pins.
    */
function writePins(pins,input){
  var filter = -1;
  if(input === true){
    filter = "input";
  }else if(input === false){
    filter = "output";
  }
  var list = "<ul class=\"pinList "+filter+"\">"
  for(i in pins){
    if(pins[i].direction===filter||filter===-1){
      list+="<li><span>"+pins[i].type+"</span><div data-uid=\""+pins[i].uid+"\" data-pid=\""+pins[i].pid+"\" data-pid=\""+pins[i].pid+"\" data-direction=\""+pins[i].direction+"\" data-type=\""+pins[i].type+"\" id=\"pid"+pins[i].pid+"\" class=\"pin\"></div></li>"
    }
  }
  return list+"</ul>";
}


/*
 * create a data-object and extract data from html template
 */

//Template for LD35
blockTemplates.LD35 = function(block) {
  this.frontendTemplate = function(data,pins) {
    var html = "";
    for(i in pins){
      html += "<div class=\""+pins[i]+"\">" + data[pins[i]]+ "</div>";
    }
    return html;
  };
  this.backendMenue = function(){
    return "<li class=\"LD35 sensor\" data-type=\"Sensor\" data-name=\"LD35\" data-system=\"arduino\" data-unique=\"false\" data-pins='"+JSON.stringify([new Pin(-1,-1,"pin","input"),new Pin(-1,-1,"celsius","output"),new Pin(-1,-1,"voltage","output")])+"'>LD35</li>";
  }
};
//Template for UI
blockTemplates.Ui = function(block) {
  this.backendMenue = function(){
    return "<li class=\"UI interface\" data-type=\"Ui\" data-name=\"Ui\" data-system=\"nodeJs\" data-unique=\"false\" data-pins='"+JSON.stringify([new Pin(-1,-1,"anything","input"),new Pin(-1,-1,"anything","input"),new Pin(-1,-1,"anything","input"),new Pin(-1,-1,"anything","input"),new Pin(-1,-1,"anything","input"),new Pin(-1,-1,"anything","input"),new Pin(-1,-1,"anything","input"),new Pin(-1,-1,"anything","input")])+"' >UI</li>";
  }
};
//Template for arduino board
blockTemplates.ArduinoUno = function(block) {
  this.backendMenue = function(){
    return "<li class=\"arduino interface\" data-type=\"ArduinoUno\" data-name=\"ArduinoUno\" data-system=\"arduino\" data-port=\"/dev/ttyACM0\" data-unique=\"true\" data-pins='"+JSON.stringify([new Pin(-1,-1,"A0","output"),new Pin(-1,-1,"A1","output"),new Pin(-1,-1,"A2","output"),new Pin(-1,-1,"A3","output")])+"'>Arduino Uno Board 1</li>";
  }
};




//Template for logic add
blockTemplates.Add = function(block) {
  this.backendMenue = function(){
    return "<li class=\"logic logic\" data-type=\"Logic\" data-name=\"Add\" data-system=\"Logic\" data-unique=\"false\" data-pins='"+JSON.stringify([new Pin(-1,-1,"number","input"),new Pin(-1,-1,"number","input"),new Pin(-1,-1,"number","output")])+"' >Logic:Add</li>";
  }
};



/* Outline-Templates for frontend:
 *  .square => square duh
 *  .skyscraper => height = 2 * width
 *  .bar => 2 * height = width
 *  over uid the value is set
 */
var square = function(title, pin) {
  return "<div class=\"item square\" id=\"upper"+pin.pid+"\"><div class=\"title\">" + title + "</div><div class=\"pinName\">" + pin.type + "</div><div class=\"data " + pin.pid + "\">no values</div></div>";
}

