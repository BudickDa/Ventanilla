var blockTemplates = {};

var backendOuter = function(uid,blockTemplate,unique){
  var html = "<div class=\"block w\" data-uid=\"" + uid + "\" id=\"uid" + uid + "\">";
  if(unique){
   html += "<div class=\"deleteButtonUnique\">X</div>";
  }else{
    html += "<div class=\"deleteButton\">X</div>";
  }
  html += "<div class=\"input _jsPlumb_endpoint_anchor_left\"></div>" + blockTemplate + "</div>";
  return html;
}


//Template for LD35
blockTemplates.LD35 = function (uid) {
  this.backendTemplate = backendOuter(uid, "<span class=\"title\">LD35</span><div class=\"ep\"></div>");
  this.frontendTemplate = function (data) {
    return "<div class=\"celsius\">" + data.celsius + "</div><div class=\"voltage\">" + data.voltage + "</div>"
  }
};
//Template for UI
blockTemplates.Ui = function (uid) {
  this.backendTemplate =  backendOuter(uid, "<span class=\"title\">UI</span><span class=\"link\"> <a href=\"/ui/" + uid + "\" title=\"zum Frontend\">go to Frontend</a></div>");
};
//Template for arduino board
blockTemplates.ArduinoUno = function (uid) {
    this.backendTemplate =  backendOuter(uid, "<span class=\"title\">Arduino Board</span><div class=\"ep\"></div>");
};
blockTemplates.Port = function (uid) {
    this.backendTemplate = backendOuter(uid, "<span class=\"title\">Arduino Board</span><div class=\"ep\"></div>");
};


/* Outline-Templates for frontend:
 *  .square => square duh
 *  .skyscraper => height = 2 * width
 *  .bar => 2 * height = width
 *  over uid the value is set
 */
var square = function(title, uid) {
  return "<div class=\"item square\"><div class=\"title\">" + title + "</div><div class=\"data " + uid + "\">no values</div></div>";
}

