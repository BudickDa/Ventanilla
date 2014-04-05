/* Template for blocks:
*  input: data: gets rendered as html
*/
var blockTemplateFrontend = {};
blockTemplateFrontend.LD35 = function (data) {
  return "<div class=\"celsius\">" + data.celsius + "</div><div class=\"voltage\">" + data.voltage + "</div>"
}


/* Itemtemplates: 
 *  .square => square duh
 *  .skyscraper => height = 2 * width
 *  .bar => 2 * height = width
 *  over uid the value is set
 */
var square = function (title, uid) {
  return "<div class=\"item square\"><div class=\"title\">" + title + "</div><div class=\"data " + uid + "\">no values</div></div>";
}

