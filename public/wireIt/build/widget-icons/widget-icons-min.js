YUI.add("widget-icons",function(e,t){e.WidgetIcons=function(t){e.after(this._renderUIicons,this,"renderUI")},e.WidgetIcons.ATTRS={icons:{value:[]}},e.WidgetIcons.prototype={_renderUIicons:function(){var t=this.get("contentBox"),n=this;e.Array.each(this.get("icons"),function(r){var i=e.Node.create('<span class="'+n.getClassName("icon")+" "+r.className+'" title="'+r.title+'"></span>');i.on("click",e.bind(n[r.click],n)),i.appendTo(t)})}}},"@VERSION@",{requires:[],skinnable:!0});