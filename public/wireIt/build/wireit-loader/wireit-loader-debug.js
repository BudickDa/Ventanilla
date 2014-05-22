/* This file is auto-generated by src/loader/scripts/meta_join.js */

YUI().use(function(Y) {
   var CONFIG = {
      groups: {
         'wireit': {
            base: 'wireit/src/',
            combine: false,
            modules: {
    "arrow-wire": {
        "requires": [
            "wire-base"
        ]
    },
    "bezier-wire": {
        "requires": [
            "wire-base"
        ]
    },
    "bidirectional-arrow-wire": {
        "requires": [
            "wire-base"
        ]
    },
    "container": {
        "requires": [
            "container-base",
            "widget-icons"
        ],
        "skinnable": true
    },
    "container-base": {
        "requires": [
            "overlay",
            "widget-parent",
            "widget-child",
            "dd",
            "resize",
            "terminal",
            "wires-delegate"
        ]
    },
    "form-container": {
        "requires": [
            "container",
            "inputex-wirable-fields"
        ],
        "skinnable": true
    },
    "image-container": {
        "requires": [
            "container-base"
        ]
    },
    "inout-container": {
        "requires": [
            "container"
        ]
    },
    "inputex-wirable": {
        "requires": [
            "terminal",
            "inputex-field"
        ]
    },
    "inputex-wirable-fields": {
        "requires": [
            "inputex-wirable",
            "inputex-group",
            "inputex-string",
            "inputex-list"
        ]
    },
    "layer": {
        "requires": [
            "widget-parent",
            "container",
            "wires-delegate"
        ],
        "skinnable": "true"
    },
    "straight-wire": {
        "requires": [
            "wire-base"
        ]
    },
    "terminal": {
        "requires": [
            "terminal-base",
            "terminal-dragedit",
            "terminal-scissors",
            "terminal-ddgroups"
        ],
        "skinnable": true
    },
    "terminal-base": {
        "requires": [
            "widget",
            "widget-child",
            "widget-position",
            "widget-position-align",
            "wire-base",
            "wires-delegate"
        ]
    },
    "terminal-ddgroups": {
        "requires": [
            "terminal-dragedit"
        ]
    },
    "terminal-dragedit": {
        "requires": [
            "bezier-wire",
            "dd-drop",
            "dd-drag",
            "dd-proxy"
        ]
    },
    "terminal-input": {
        "requires": [
            "terminal"
        ]
    },
    "terminal-output": {
        "requires": [
            "terminal"
        ]
    },
    "terminal-scissors": {
        "requires": [
            "overlay"
        ]
    },
    "textarea-container": {
        "requires": [
            "container"
        ]
    },
    "widget-icons": {
        "requires": [],
        "skinnable": true
    },
    "wire-base": {
        "requires": [
            "graphics"
        ],
        "skinnable": true
    },
    "wireit-app": {
        "requires": [
            "app",
            "handlebars",
            "model",
            "model-list",
            "json",
            "view",
            "layer",
            "bezier-wire",
            "anim"
        ]
    },
    "wires-delegate": {
        "requires": [
            "wire-base"
        ]
    }
}
         }
      }
   };

   if(typeof YUI_config === 'undefined') {
      YUI_config = {groups: {}};
   }
   else if(YUI_config.groups.inputex) {

      // inputex-wirable trick
      // replace all 'inputex-field' dependencies in inputEx by 'inputex-wirable'
      for(var k in YUI_config.groups.inputex.modules) {
         if(YUI_config.groups.inputex.modules.hasOwnProperty(k)) {
            var m = YUI_config.groups.inputex.modules[k];
            if(m.requires) {
               var index = m.requires.indexOf('inputex-field');
               if(index != -1) {
                  m.requires[index] = 'inputex-wirable';
               }
            }
         }
      }

   }
   Y.mix(YUI_config.groups, CONFIG.groups);

});

