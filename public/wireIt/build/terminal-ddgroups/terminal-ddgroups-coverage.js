if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/terminal-ddgroups/terminal-ddgroups.js']) {
   __coverage__['build/terminal-ddgroups/terminal-ddgroups.js'] = {"path":"build/terminal-ddgroups/terminal-ddgroups.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":29},"end":{"line":1,"column":48}}},"2":{"name":"(anonymous_2)","line":13,"loc":{"start":{"line":13,"column":21},"end":{"line":13,"column":39}}},"3":{"name":"(anonymous_3)","line":36,"loc":{"start":{"line":36,"column":20},"end":{"line":36,"column":32}}},"4":{"name":"(anonymous_4)","line":47,"loc":{"start":{"line":47,"column":19},"end":{"line":47,"column":31}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":67,"column":53}},"2":{"start":{"line":13,"column":0},"end":{"line":15,"column":2}},"3":{"start":{"line":14,"column":3},"end":{"line":14,"column":51}},"4":{"start":{"line":17,"column":0},"end":{"line":32,"column":2}},"5":{"start":{"line":34,"column":0},"end":{"line":63,"column":2}},"6":{"start":{"line":37,"column":6},"end":{"line":39,"column":7}},"7":{"start":{"line":38,"column":9},"end":{"line":38,"column":31}},"8":{"start":{"line":49,"column":6},"end":{"line":59,"column":7}},"9":{"start":{"line":51,"column":9},"end":{"line":54,"column":12}},"10":{"start":{"line":55,"column":9},"end":{"line":56,"column":93}},"11":{"start":{"line":58,"column":9},"end":{"line":58,"column":86}}},"branchMap":{"1":{"line":37,"type":"if","locations":[{"start":{"line":37,"column":6},"end":{"line":37,"column":6}},{"start":{"line":37,"column":6},"end":{"line":37,"column":6}}]},"2":{"line":49,"type":"if","locations":[{"start":{"line":49,"column":6},"end":{"line":49,"column":6}},{"start":{"line":49,"column":6},"end":{"line":49,"column":6}}]}},"code":["(function () { YUI.add('terminal-ddgroups', function (Y, NAME) {","","/**"," * @module terminal-ddgroups"," */","","/**"," * Extension to add \"groups\" labels when hovering the terminal"," * @class TerminalDDGroups"," * @constructor"," * @param {Object} config configuration object"," */","Y.TerminalDDGroups = function (config) {","   Y.after(this._renderUIgroups, this, \"renderUI\");","};","","Y.TerminalDDGroups.ATTRS = {","   ","   /**","    * drag/drop groups : list of supported terminal types","    * only used if editable is set to true","    * @attribute groups","    */","   groups: {","      value: ['terminal']","   },","   ","   showGroups: {","      value: true","   }","   ","};","","Y.TerminalDDGroups.prototype = {","   ","   _renderUIgroups: function () {","      if( this.get('editable') ) {","         this._renderTooltip();","      }","   },","   ","   /**","    * create a persisting tooltip with the scissors class","    * listen for click events on the tooltip and call destroyWires","    * @method _renderTooltip","    */","   _renderTooltip: function () {","      ","      if(this.get('showGroups')) {","         ","         var ddGroupsOverlay = new Y.Overlay({","            render: this.get('boundingBox'),","            bodyContent: this.get('groups').join(',')","         });","         ddGroupsOverlay.set(\"align\", {node: this.get('contentBox'), ","                               points:[Y.WidgetPositionAlign.TC, Y.WidgetPositionAlign.BC]});","","         ddGroupsOverlay.get('contentBox').addClass( this.getClassName(\"dd-groups\") );","      }","      ","   }","   ","};","","","","}, '@VERSION@', {\"requires\": [\"terminal-dragedit\"]});","","}());"]};
}
var __cov_nGBCivflfNA2Os9Q7Y7vJA = __coverage__['build/terminal-ddgroups/terminal-ddgroups.js'];
__cov_nGBCivflfNA2Os9Q7Y7vJA.s['1']++;YUI.add('terminal-ddgroups',function(Y,NAME){__cov_nGBCivflfNA2Os9Q7Y7vJA.f['1']++;__cov_nGBCivflfNA2Os9Q7Y7vJA.s['2']++;Y.TerminalDDGroups=function(config){__cov_nGBCivflfNA2Os9Q7Y7vJA.f['2']++;__cov_nGBCivflfNA2Os9Q7Y7vJA.s['3']++;Y.after(this._renderUIgroups,this,'renderUI');};__cov_nGBCivflfNA2Os9Q7Y7vJA.s['4']++;Y.TerminalDDGroups.ATTRS={groups:{value:['terminal']},showGroups:{value:true}};__cov_nGBCivflfNA2Os9Q7Y7vJA.s['5']++;Y.TerminalDDGroups.prototype={_renderUIgroups:function(){__cov_nGBCivflfNA2Os9Q7Y7vJA.f['3']++;__cov_nGBCivflfNA2Os9Q7Y7vJA.s['6']++;if(this.get('editable')){__cov_nGBCivflfNA2Os9Q7Y7vJA.b['1'][0]++;__cov_nGBCivflfNA2Os9Q7Y7vJA.s['7']++;this._renderTooltip();}else{__cov_nGBCivflfNA2Os9Q7Y7vJA.b['1'][1]++;}},_renderTooltip:function(){__cov_nGBCivflfNA2Os9Q7Y7vJA.f['4']++;__cov_nGBCivflfNA2Os9Q7Y7vJA.s['8']++;if(this.get('showGroups')){__cov_nGBCivflfNA2Os9Q7Y7vJA.b['2'][0]++;__cov_nGBCivflfNA2Os9Q7Y7vJA.s['9']++;var ddGroupsOverlay=new Y.Overlay({render:this.get('boundingBox'),bodyContent:this.get('groups').join(',')});__cov_nGBCivflfNA2Os9Q7Y7vJA.s['10']++;ddGroupsOverlay.set('align',{node:this.get('contentBox'),points:[Y.WidgetPositionAlign.TC,Y.WidgetPositionAlign.BC]});__cov_nGBCivflfNA2Os9Q7Y7vJA.s['11']++;ddGroupsOverlay.get('contentBox').addClass(this.getClassName('dd-groups'));}else{__cov_nGBCivflfNA2Os9Q7Y7vJA.b['2'][1]++;}}};},'@VERSION@',{'requires':['terminal-dragedit']});
