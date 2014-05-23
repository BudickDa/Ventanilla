if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/terminal-input/terminal-input.js']) {
   __coverage__['build/terminal-input/terminal-input.js'] = {"path":"build/terminal-input/terminal-input.js","s":{"1":0,"2":0,"3":0,"4":0},"b":{},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":26},"end":{"line":1,"column":45}}},"2":{"name":"(anonymous_2)","line":16,"loc":{"start":{"line":16,"column":18},"end":{"line":16,"column":58}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":40,"column":44}},"2":{"start":{"line":16,"column":0},"end":{"line":18,"column":2}},"3":{"start":{"line":17,"column":3},"end":{"line":17,"column":82}},"4":{"start":{"line":19,"column":0},"end":{"line":36,"column":3}}},"branchMap":{},"code":["(function () { YUI.add('terminal-input', function (Y, NAME) {","","/**"," * @module terminal-input"," */","","/**"," * Class that extends Terminal to differenciate Input/Output terminals"," * @class TerminalInput"," * @extends Terminal"," * @constructor"," * @param {HTMLElement} parentEl Parent dom element"," * @param {Object} options configuration object"," * @param {Container} container (Optional) Container containing this terminal"," */","Y.TerminalInput = function (parentEl, options, container) {","   Y.TerminalInput.superclass.constructor.call(this,parentEl, options, container);","};","Y.extend(Y.TerminalInput, Y.Terminal, {","   ","   /**","    * @attribute nMaxWires","    * @description maximum number of wires for this terminal","    * @type Integer","    * @default 1","    */","   nMaxWires: 1,","   ","   /**","    * @attribute ddConfig","    * @description configuration of the Y.TerminalProxy object","    * @type Object","    * @default { type: \"input\", allowedTypes: [\"output\"] }","    */","   ddConfig: { type: \"input\", allowedTypes: [\"output\"] }","});","","","","}, '@VERSION@', {\"requires\": [\"terminal\"]});","","}());"]};
}
var __cov_TH7Q83r5C61TH$2o6FLSig = __coverage__['build/terminal-input/terminal-input.js'];
__cov_TH7Q83r5C61TH$2o6FLSig.s['1']++;YUI.add('terminal-input',function(Y,NAME){__cov_TH7Q83r5C61TH$2o6FLSig.f['1']++;__cov_TH7Q83r5C61TH$2o6FLSig.s['2']++;Y.TerminalInput=function(parentEl,options,container){__cov_TH7Q83r5C61TH$2o6FLSig.f['2']++;__cov_TH7Q83r5C61TH$2o6FLSig.s['3']++;Y.TerminalInput.superclass.constructor.call(this,parentEl,options,container);};__cov_TH7Q83r5C61TH$2o6FLSig.s['4']++;Y.extend(Y.TerminalInput,Y.Terminal,{nMaxWires:1,ddConfig:{type:'input',allowedTypes:['output']}});},'@VERSION@',{'requires':['terminal']});