if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/wireit-loader/wireit-loader.js']) {
   __coverage__['build/wireit-loader/wireit-loader.js'] = {"path":"build/wireit-loader/wireit-loader.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":3,"loc":{"start":{"line":3,"column":10},"end":{"line":3,"column":22}}}},"statementMap":{"1":{"start":{"line":3,"column":0},"end":{"line":194,"column":3}},"2":{"start":{"line":4,"column":3},"end":{"line":170,"column":5}},"3":{"start":{"line":172,"column":3},"end":{"line":191,"column":4}},"4":{"start":{"line":173,"column":6},"end":{"line":173,"column":32}},"5":{"start":{"line":175,"column":8},"end":{"line":191,"column":4}},"6":{"start":{"line":179,"column":6},"end":{"line":189,"column":7}},"7":{"start":{"line":180,"column":9},"end":{"line":188,"column":10}},"8":{"start":{"line":181,"column":12},"end":{"line":181,"column":57}},"9":{"start":{"line":182,"column":12},"end":{"line":187,"column":13}},"10":{"start":{"line":183,"column":15},"end":{"line":183,"column":63}},"11":{"start":{"line":184,"column":15},"end":{"line":186,"column":16}},"12":{"start":{"line":185,"column":18},"end":{"line":185,"column":56}},"13":{"start":{"line":192,"column":3},"end":{"line":192,"column":43}}},"branchMap":{"1":{"line":172,"type":"if","locations":[{"start":{"line":172,"column":3},"end":{"line":172,"column":3}},{"start":{"line":172,"column":3},"end":{"line":172,"column":3}}]},"2":{"line":175,"type":"if","locations":[{"start":{"line":175,"column":8},"end":{"line":175,"column":8}},{"start":{"line":175,"column":8},"end":{"line":175,"column":8}}]},"3":{"line":180,"type":"if","locations":[{"start":{"line":180,"column":9},"end":{"line":180,"column":9}},{"start":{"line":180,"column":9},"end":{"line":180,"column":9}}]},"4":{"line":182,"type":"if","locations":[{"start":{"line":182,"column":12},"end":{"line":182,"column":12}},{"start":{"line":182,"column":12},"end":{"line":182,"column":12}}]},"5":{"line":184,"type":"if","locations":[{"start":{"line":184,"column":15},"end":{"line":184,"column":15}},{"start":{"line":184,"column":15},"end":{"line":184,"column":15}}]}},"code":["(function () { /* This file is auto-generated by src/loader/scripts/meta_join.js */","","YUI().use(function(Y) {","   var CONFIG = {","      groups: {","         'wireit': {","            base: 'wireit/src/',","            combine: false,","            modules: {","    \"arrow-wire\": {","        \"requires\": [","            \"wire-base\"","        ]","    },","    \"bezier-wire\": {","        \"requires\": [","            \"wire-base\"","        ]","    },","    \"bidirectional-arrow-wire\": {","        \"requires\": [","            \"wire-base\"","        ]","    },","    \"container\": {","        \"requires\": [","            \"container-base\",","            \"widget-icons\"","        ],","        \"skinnable\": true","    },","    \"container-base\": {","        \"requires\": [","            \"overlay\",","            \"widget-parent\",","            \"widget-child\",","            \"dd\",","            \"resize\",","            \"terminal\",","            \"wires-delegate\"","        ]","    },","    \"form-container\": {","        \"requires\": [","            \"container\",","            \"inputex-wirable-fields\"","        ],","        \"skinnable\": true","    },","    \"image-container\": {","        \"requires\": [","            \"container-base\"","        ]","    },","    \"inout-container\": {","        \"requires\": [","            \"container\"","        ]","    },","    \"inputex-wirable\": {","        \"requires\": [","            \"terminal\",","            \"inputex-field\"","        ]","    },","    \"inputex-wirable-fields\": {","        \"requires\": [","            \"inputex-wirable\",","            \"inputex-group\",","            \"inputex-string\",","            \"inputex-list\"","        ]","    },","    \"layer\": {","        \"requires\": [","            \"widget-parent\",","            \"container\",","            \"wires-delegate\"","        ],","        \"skinnable\": \"true\"","    },","    \"straight-wire\": {","        \"requires\": [","            \"wire-base\"","        ]","    },","    \"terminal\": {","        \"requires\": [","            \"terminal-base\",","            \"terminal-dragedit\",","            \"terminal-scissors\",","            \"terminal-ddgroups\"","        ],","        \"skinnable\": true","    },","    \"terminal-base\": {","        \"requires\": [","            \"widget\",","            \"widget-child\",","            \"widget-position\",","            \"widget-position-align\",","            \"wire-base\",","            \"wires-delegate\"","        ]","    },","    \"terminal-ddgroups\": {","        \"requires\": [","            \"terminal-dragedit\"","        ]","    },","    \"terminal-dragedit\": {","        \"requires\": [","            \"bezier-wire\",","            \"dd-drop\",","            \"dd-drag\",","            \"dd-proxy\"","        ]","    },","    \"terminal-input\": {","        \"requires\": [","            \"terminal\"","        ]","    },","    \"terminal-output\": {","        \"requires\": [","            \"terminal\"","        ]","    },","    \"terminal-scissors\": {","        \"requires\": [","            \"overlay\"","        ]","    },","    \"textarea-container\": {","        \"requires\": [","            \"container\"","        ]","    },","    \"widget-icons\": {","        \"requires\": [],","        \"skinnable\": true","    },","    \"wire-base\": {","        \"requires\": [","            \"graphics\"","        ],","        \"skinnable\": true","    },","    \"wireit-app\": {","        \"requires\": [","            \"app\",","            \"handlebars\",","            \"model\",","            \"model-list\",","            \"json\",","            \"view\",","            \"layer\",","            \"bezier-wire\",","            \"anim\"","        ]","    },","    \"wires-delegate\": {","        \"requires\": [","            \"wire-base\"","        ]","    }","}","         }","      }","   };","","   if(typeof YUI_config === 'undefined') { ","      YUI_config = {groups: {}}; ","   }","   else if(YUI_config.groups.inputex) {","      ","      // inputex-wirable trick","      // replace all 'inputex-field' dependencies in inputEx by 'inputex-wirable'","      for(var k in YUI_config.groups.inputex.modules) {","         if(YUI_config.groups.inputex.modules.hasOwnProperty(k)) {","            var m = YUI_config.groups.inputex.modules[k];","            if(m.requires) {","               var index = m.requires.indexOf('inputex-field');","               if(index != -1) {","                  m.requires[index] = 'inputex-wirable';","               }","            }","         }","      }","      ","   }","   Y.mix(YUI_config.groups, CONFIG.groups);","","});","","","}());"]};
}
var __cov_MVh41LnQnUATAIVJLrF3xw = __coverage__['build/wireit-loader/wireit-loader.js'];
__cov_MVh41LnQnUATAIVJLrF3xw.s['1']++;YUI().use(function(Y){__cov_MVh41LnQnUATAIVJLrF3xw.f['1']++;__cov_MVh41LnQnUATAIVJLrF3xw.s['2']++;var CONFIG={groups:{'wireit':{base:'wireit/src/',combine:false,modules:{'arrow-wire':{'requires':['wire-base']},'bezier-wire':{'requires':['wire-base']},'bidirectional-arrow-wire':{'requires':['wire-base']},'container':{'requires':['container-base','widget-icons'],'skinnable':true},'container-base':{'requires':['overlay','widget-parent','widget-child','dd','resize','terminal','wires-delegate']},'form-container':{'requires':['container','inputex-wirable-fields'],'skinnable':true},'image-container':{'requires':['container-base']},'inout-container':{'requires':['container']},'inputex-wirable':{'requires':['terminal','inputex-field']},'inputex-wirable-fields':{'requires':['inputex-wirable','inputex-group','inputex-string','inputex-list']},'layer':{'requires':['widget-parent','container','wires-delegate'],'skinnable':'true'},'straight-wire':{'requires':['wire-base']},'terminal':{'requires':['terminal-base','terminal-dragedit','terminal-scissors','terminal-ddgroups'],'skinnable':true},'terminal-base':{'requires':['widget','widget-child','widget-position','widget-position-align','wire-base','wires-delegate']},'terminal-ddgroups':{'requires':['terminal-dragedit']},'terminal-dragedit':{'requires':['bezier-wire','dd-drop','dd-drag','dd-proxy']},'terminal-input':{'requires':['terminal']},'terminal-output':{'requires':['terminal']},'terminal-scissors':{'requires':['overlay']},'textarea-container':{'requires':['container']},'widget-icons':{'requires':[],'skinnable':true},'wire-base':{'requires':['graphics'],'skinnable':true},'wireit-app':{'requires':['app','handlebars','model','model-list','json','view','layer','bezier-wire','anim']},'wires-delegate':{'requires':['wire-base']}}}}};__cov_MVh41LnQnUATAIVJLrF3xw.s['3']++;if(typeof YUI_config==='undefined'){__cov_MVh41LnQnUATAIVJLrF3xw.b['1'][0]++;__cov_MVh41LnQnUATAIVJLrF3xw.s['4']++;YUI_config={groups:{}};}else{__cov_MVh41LnQnUATAIVJLrF3xw.b['1'][1]++;__cov_MVh41LnQnUATAIVJLrF3xw.s['5']++;if(YUI_config.groups.inputex){__cov_MVh41LnQnUATAIVJLrF3xw.b['2'][0]++;__cov_MVh41LnQnUATAIVJLrF3xw.s['6']++;for(var k in YUI_config.groups.inputex.modules){__cov_MVh41LnQnUATAIVJLrF3xw.s['7']++;if(YUI_config.groups.inputex.modules.hasOwnProperty(k)){__cov_MVh41LnQnUATAIVJLrF3xw.b['3'][0]++;__cov_MVh41LnQnUATAIVJLrF3xw.s['8']++;var m=YUI_config.groups.inputex.modules[k];__cov_MVh41LnQnUATAIVJLrF3xw.s['9']++;if(m.requires){__cov_MVh41LnQnUATAIVJLrF3xw.b['4'][0]++;__cov_MVh41LnQnUATAIVJLrF3xw.s['10']++;var index=m.requires.indexOf('inputex-field');__cov_MVh41LnQnUATAIVJLrF3xw.s['11']++;if(index!=-1){__cov_MVh41LnQnUATAIVJLrF3xw.b['5'][0]++;__cov_MVh41LnQnUATAIVJLrF3xw.s['12']++;m.requires[index]='inputex-wirable';}else{__cov_MVh41LnQnUATAIVJLrF3xw.b['5'][1]++;}}else{__cov_MVh41LnQnUATAIVJLrF3xw.b['4'][1]++;}}else{__cov_MVh41LnQnUATAIVJLrF3xw.b['3'][1]++;}}}else{__cov_MVh41LnQnUATAIVJLrF3xw.b['2'][1]++;}}__cov_MVh41LnQnUATAIVJLrF3xw.s['13']++;Y.mix(YUI_config.groups,CONFIG.groups);});