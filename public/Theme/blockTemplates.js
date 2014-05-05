var blockTemplates = {};

var backendOuter = function(uid,blockTemplate,unique){
  var html = "<div class=\"block w\" data-uid=\"" + uid + "\" id=\"uid" + uid + "\">";
  log("is unique "+unique);
  if(unique==="true"){
    html += "<div class=\"deleteButtonUnique\">X</div>";
  }else{
    html += "<div class=\"deleteButton\">X</div>";
  }
  html += "<div class=\"input _jsPlumb_endpoint_anchor_left\"></div>" + blockTemplate + "</div>";
  return html;
}


//Template for LD35
blockTemplates.LD35 = function(block) {
  if(block!==undefined){
    this.backendTemplate = backendOuter(block.uid, "<span class=\"title\">LD35</span><div class=\"ep\"></div>",block.unique);
  }
  this.frontendTemplate = function(data) {
    return "<div class=\"celsius\">" + data.celsius + "</div><div class=\"voltage\">" + data.voltage + "</div>"
  };
  this.frontendMenue = function(){
    return "<li class=\"LD35 sensor\" data-type=\"Sensor\" data-name=\"LD35\" data-system=\"arduino\" data-unique=\"false\">LD35</li>";
  }
};
//Template for UI
blockTemplates.Ui = function(block) {
  if(block!==undefined){
    this.backendTemplate =  backendOuter(block.uid, "<span class=\"title\">UI</span><span class=\"link\"> <a href=\"/ui/" + block.uid + "\" title=\"zum Frontend\">go to Frontend</a></div>",block.unique);
  }
  this.frontendMenue = function(){
    return "<li class=\"UI interface\" data-type=\"Ui\" data-name=\"Ui\" data-system=\"nodeJs\" data-unique=\"false\">UI</li>";
  }
};
//Template for arduino board
blockTemplates.ArduinoUno = function(block) {
  if(block!==undefined){
    this.backendTemplate =  backendOuter(block.uid, "<span class=\"title\">Arduino Board</span><div class=\"ep\"></div>",block.unique);
  }
   this.frontendMenue = function(){
    return "<li class=\"arduino interface\" data-type=\"ArduinoUno\" data-name=\"ArduinoUno\" data-system=\"arduino\" data-port=\"/dev/ttyACM0\" data-unique=\"true\">Arduino Uno Board 1</li>";
  }
};
blockTemplates.Port = function(block) {
  if(block!==undefined){
    this.backendTemplate = backendOuter(block.uid, "<span class=\"title\">Port "+block.hardware.port+"</span><div class=\"ep\"></div>",block.unique);
  }
  this.frontendMenue = function(){
    return "<li class=\"arduino string\" data-type=\"Port\" data-name=\"Port\" data-system=\"arduino\" data-port=\"/dev/ttyACM0\" data-unique=\"true\">Port: /dev/ttyACM0</li>";
  }
};






/* Outline-Templates for frontend:
 *  .square => square duh
 *  .skyscraper => height = 2 * width
 *  .bar => 2 * height = width
 *  over uid the value is set
 */
var square = function(title, uid) {
  return "<div class=\"item square\" id=\"upper"+uid+"\"><div class=\"title\">" + title + "</div><div class=\"data " + uid + "\">no values</div></div>";
}

