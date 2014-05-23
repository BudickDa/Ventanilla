if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/inputex-wirable-fields/inputex-wirable-fields.js']) {
   __coverage__['build/inputex-wirable-fields/inputex-wirable-fields.js'] = {"path":"build/inputex-wirable-fields/inputex-wirable-fields.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":34},"end":{"line":1,"column":53}}},"2":{"name":"(anonymous_2)","line":11,"loc":{"start":{"line":11,"column":45},"end":{"line":11,"column":61}}},"3":{"name":"(anonymous_3)","line":23,"loc":{"start":{"line":23,"column":39},"end":{"line":23,"column":60}}},"4":{"name":"(anonymous_4)","line":40,"loc":{"start":{"line":40,"column":43},"end":{"line":40,"column":64}}},"5":{"name":"(anonymous_5)","line":56,"loc":{"start":{"line":56,"column":41},"end":{"line":56,"column":58}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":64,"column":102}},"2":{"start":{"line":4,"column":3},"end":{"line":4,"column":27}},"3":{"start":{"line":11,"column":0},"end":{"line":17,"column":2}},"4":{"start":{"line":12,"column":3},"end":{"line":12,"column":23}},"5":{"start":{"line":13,"column":3},"end":{"line":16,"column":4}},"6":{"start":{"line":14,"column":6},"end":{"line":14,"column":38}},"7":{"start":{"line":23,"column":0},"end":{"line":34,"column":2}},"8":{"start":{"line":25,"column":3},"end":{"line":25,"column":63}},"9":{"start":{"line":28,"column":3},"end":{"line":32,"column":4}},"10":{"start":{"line":29,"column":6},"end":{"line":31,"column":7}},"11":{"start":{"line":30,"column":9},"end":{"line":30,"column":48}},"12":{"start":{"line":40,"column":0},"end":{"line":50,"column":2}},"13":{"start":{"line":42,"column":3},"end":{"line":42,"column":67}},"14":{"start":{"line":44,"column":3},"end":{"line":48,"column":4}},"15":{"start":{"line":45,"column":6},"end":{"line":47,"column":7}},"16":{"start":{"line":46,"column":9},"end":{"line":46,"column":51}},"17":{"start":{"line":55,"column":0},"end":{"line":55,"column":81}},"18":{"start":{"line":56,"column":0},"end":{"line":60,"column":2}},"19":{"start":{"line":57,"column":3},"end":{"line":57,"column":35}},"20":{"start":{"line":58,"column":3},"end":{"line":58,"column":42}},"21":{"start":{"line":59,"column":3},"end":{"line":59,"column":12}}},"branchMap":{"1":{"line":13,"type":"if","locations":[{"start":{"line":13,"column":3},"end":{"line":13,"column":3}},{"start":{"line":13,"column":3},"end":{"line":13,"column":3}}]},"2":{"line":28,"type":"if","locations":[{"start":{"line":28,"column":3},"end":{"line":28,"column":3}},{"start":{"line":28,"column":3},"end":{"line":28,"column":3}}]},"3":{"line":44,"type":"if","locations":[{"start":{"line":44,"column":3},"end":{"line":44,"column":3}},{"start":{"line":44,"column":3},"end":{"line":44,"column":3}}]}},"code":["(function () { YUI.add('inputex-wirable-fields', function (Y, NAME) {","","   ","   var inputEx = Y.inputEx;","   ","// this file ovveride many functions on inputEx fields to make them wirable","","/**"," * setFieldName might change the name of the terminal"," */","inputEx.StringField.prototype.setFieldName = function (name) {","   this.el.name = name;","   if(this.terminal) {","      this.terminal.set('name', name);","      // TODO: this.terminal.el.title = name;","   }","};","","","/**"," * Groups must set the container recursively"," */","inputEx.Group.prototype.setContainer = function (container) {","   ","   inputEx.Group.superclass.setContainer.call(this, container);","   ","   // Group and inherited fields must set this recursively","   if(this.inputs) {","      for(var i = 0 ; i < this.inputs.length ; i++) {","         this.inputs[i].setContainer(container);","      }","   }","   ","};","","","/**"," * List must set the container recursively"," */","inputEx.ListField.prototype.setContainer = function (container) {","   ","   inputEx.ListField.superclass.setContainer.call(this, container);","","   if(this.subFields) {","      for(var i = 0 ; i < this.subFields.length ; i++) {","         this.subFields[i].setContainer(container);","      }","   }","   ","};","","/**"," * setContainer must be called on each new element"," */","inputEx.ListField.prototype._addElement = inputEx.ListField.prototype.addElement;","inputEx.ListField.prototype.addElement = function (value) {","   var f = this._addElement(value);","   f.setContainer(this.options.container);","   return f;","};","","","","}, '@VERSION@', {\"requires\": [\"inputex-wirable\", \"inputex-group\", \"inputex-string\", \"inputex-list\"]});","","}());"]};
}
var __cov_f65agXZV8Red4gd9619kcg = __coverage__['build/inputex-wirable-fields/inputex-wirable-fields.js'];
__cov_f65agXZV8Red4gd9619kcg.s['1']++;YUI.add('inputex-wirable-fields',function(Y,NAME){__cov_f65agXZV8Red4gd9619kcg.f['1']++;__cov_f65agXZV8Red4gd9619kcg.s['2']++;var inputEx=Y.inputEx;__cov_f65agXZV8Red4gd9619kcg.s['3']++;inputEx.StringField.prototype.setFieldName=function(name){__cov_f65agXZV8Red4gd9619kcg.f['2']++;__cov_f65agXZV8Red4gd9619kcg.s['4']++;this.el.name=name;__cov_f65agXZV8Red4gd9619kcg.s['5']++;if(this.terminal){__cov_f65agXZV8Red4gd9619kcg.b['1'][0]++;__cov_f65agXZV8Red4gd9619kcg.s['6']++;this.terminal.set('name',name);}else{__cov_f65agXZV8Red4gd9619kcg.b['1'][1]++;}};__cov_f65agXZV8Red4gd9619kcg.s['7']++;inputEx.Group.prototype.setContainer=function(container){__cov_f65agXZV8Red4gd9619kcg.f['3']++;__cov_f65agXZV8Red4gd9619kcg.s['8']++;inputEx.Group.superclass.setContainer.call(this,container);__cov_f65agXZV8Red4gd9619kcg.s['9']++;if(this.inputs){__cov_f65agXZV8Red4gd9619kcg.b['2'][0]++;__cov_f65agXZV8Red4gd9619kcg.s['10']++;for(var i=0;i<this.inputs.length;i++){__cov_f65agXZV8Red4gd9619kcg.s['11']++;this.inputs[i].setContainer(container);}}else{__cov_f65agXZV8Red4gd9619kcg.b['2'][1]++;}};__cov_f65agXZV8Red4gd9619kcg.s['12']++;inputEx.ListField.prototype.setContainer=function(container){__cov_f65agXZV8Red4gd9619kcg.f['4']++;__cov_f65agXZV8Red4gd9619kcg.s['13']++;inputEx.ListField.superclass.setContainer.call(this,container);__cov_f65agXZV8Red4gd9619kcg.s['14']++;if(this.subFields){__cov_f65agXZV8Red4gd9619kcg.b['3'][0]++;__cov_f65agXZV8Red4gd9619kcg.s['15']++;for(var i=0;i<this.subFields.length;i++){__cov_f65agXZV8Red4gd9619kcg.s['16']++;this.subFields[i].setContainer(container);}}else{__cov_f65agXZV8Red4gd9619kcg.b['3'][1]++;}};__cov_f65agXZV8Red4gd9619kcg.s['17']++;inputEx.ListField.prototype._addElement=inputEx.ListField.prototype.addElement;__cov_f65agXZV8Red4gd9619kcg.s['18']++;inputEx.ListField.prototype.addElement=function(value){__cov_f65agXZV8Red4gd9619kcg.f['5']++;__cov_f65agXZV8Red4gd9619kcg.s['19']++;var f=this._addElement(value);__cov_f65agXZV8Red4gd9619kcg.s['20']++;f.setContainer(this.options.container);__cov_f65agXZV8Red4gd9619kcg.s['21']++;return f;};},'@VERSION@',{'requires':['inputex-wirable','inputex-group','inputex-string','inputex-list']});