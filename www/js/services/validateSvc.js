define(["./module","zepto"],function(t,i){t.service("validateService",function(){this.isEmpty=function(t){var n=0,e=i(t).find(".j-input").length,a="";return i(t).find(".j-input").each(function(){var t=(i(this).attr("name"),i.trim(i(this).val()));return""===t||void 0===t||null===t?(a=i(this).data("empty"),!1):void n++}),n===e?1:a},this.submitData=function(t){var n={};return i(t).find("input[name],textarea[name],select[name]").each(function(){var t=i(this).attr("name"),e=i.trim(i(this).val());n[t]=e}),n}})});