if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/straight-wire/straight-wire.js']) {
   __coverage__['build/straight-wire/straight-wire.js'] = {"path":"build/straight-wire/straight-wire.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0},"b":{},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":25},"end":{"line":1,"column":44}}},"2":{"name":"(anonymous_2)","line":14,"loc":{"start":{"line":14,"column":17},"end":{"line":14,"column":32}}},"3":{"name":"(anonymous_3)","line":26,"loc":{"start":{"line":26,"column":10},"end":{"line":26,"column":22}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":43,"column":45}},"2":{"start":{"line":14,"column":0},"end":{"line":16,"column":2}},"3":{"start":{"line":15,"column":3},"end":{"line":15,"column":64}},"4":{"start":{"line":18,"column":0},"end":{"line":18,"column":37}},"5":{"start":{"line":20,"column":0},"end":{"line":38,"column":3}},"6":{"start":{"line":28,"column":6},"end":{"line":28,"column":19}},"7":{"start":{"line":30,"column":6},"end":{"line":30,"column":40}},"8":{"start":{"line":31,"column":6},"end":{"line":31,"column":40}},"9":{"start":{"line":33,"column":6},"end":{"line":33,"column":42}},"10":{"start":{"line":34,"column":6},"end":{"line":34,"column":42}},"11":{"start":{"line":35,"column":6},"end":{"line":35,"column":17}},"12":{"start":{"line":40,"column":0},"end":{"line":40,"column":53}}},"branchMap":{},"code":["(function () { YUI.add('straight-wire', function (Y, NAME) {","","/**"," * @module straight-wire"," */","","/**"," * Straight Wire"," * @class StraightWire"," * @extends WireBase"," * @constructor"," * @param {Object} cfg the configuration for the StraightWire attributes"," */","Y.StraightWire = function (cfg) {","   Y.StraightWire.superclass.constructor.apply(this, arguments);","};","","Y.StraightWire.NAME = \"straightwire\";","","Y.extend(Y.StraightWire, Y.WireBase, {","  ","   /**","    * @method _draw","    * @private","    */","   _draw: function () {","      ","      this.clear();","      ","      var src = this.get('src').getXY();","      var tgt = this.get('tgt').getXY();","      ","      this.moveTo((src[0]+6), (src[1]+6));","      this.lineTo((tgt[0]+6), (tgt[1]+6));","      this.end();","   }","   ","});","","Y.StraightWire.ATTRS = Y.merge(Y.WireBase.ATTRS, {});","","","}, '@VERSION@', {\"requires\": [\"wire-base\"]});","","}());"]};
}
var __cov_CNTB$78zg8rwrukyy0XQHg = __coverage__['build/straight-wire/straight-wire.js'];
__cov_CNTB$78zg8rwrukyy0XQHg.s['1']++;YUI.add('straight-wire',function(Y,NAME){__cov_CNTB$78zg8rwrukyy0XQHg.f['1']++;__cov_CNTB$78zg8rwrukyy0XQHg.s['2']++;Y.StraightWire=function(cfg){__cov_CNTB$78zg8rwrukyy0XQHg.f['2']++;__cov_CNTB$78zg8rwrukyy0XQHg.s['3']++;Y.StraightWire.superclass.constructor.apply(this,arguments);};__cov_CNTB$78zg8rwrukyy0XQHg.s['4']++;Y.StraightWire.NAME='straightwire';__cov_CNTB$78zg8rwrukyy0XQHg.s['5']++;Y.extend(Y.StraightWire,Y.WireBase,{_draw:function(){__cov_CNTB$78zg8rwrukyy0XQHg.f['3']++;__cov_CNTB$78zg8rwrukyy0XQHg.s['6']++;this.clear();__cov_CNTB$78zg8rwrukyy0XQHg.s['7']++;var src=this.get('src').getXY();__cov_CNTB$78zg8rwrukyy0XQHg.s['8']++;var tgt=this.get('tgt').getXY();__cov_CNTB$78zg8rwrukyy0XQHg.s['9']++;this.moveTo(src[0]+6,src[1]+6);__cov_CNTB$78zg8rwrukyy0XQHg.s['10']++;this.lineTo(tgt[0]+6,tgt[1]+6);__cov_CNTB$78zg8rwrukyy0XQHg.s['11']++;this.end();}});__cov_CNTB$78zg8rwrukyy0XQHg.s['12']++;Y.StraightWire.ATTRS=Y.merge(Y.WireBase.ATTRS,{});},'@VERSION@',{'requires':['wire-base']});
