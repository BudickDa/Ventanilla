var blockTemplateBackend = {};


//Template for LD35
blockTemplateBackend.LD35 = function (uid) {
  return "<div class=\"block w\" data-uid=\"" + uid + "\" id=\"uid" + uid + "\"><div class=\"ep left\"></div><span class=\"title\">LD35</span></div>";
};
//Template for UI
blockTemplateBackend.Ui = function (uid) {
  return "<div class=\"block w\" data-uid=\"" + uid + "\" id=\"uid" + uid + "\"><span class=\"title\">UI</span><span class=\"link\"><a href=\"/ui/" + uid + "\" title=\"zum Frontend\">go to Frontend</a><div class=\"ep\"></div></div>";
};
//Template for arduino board
blockTemplateBackend.ArduinoUno = function (uid) {
  return "<div class=\"block w\" data-uid=\"" + uid + "\" id=\"uid" + uid + "\"><span class=\"title\">Arduino Board</span><div class=\"ep\"></div></div>";
};
