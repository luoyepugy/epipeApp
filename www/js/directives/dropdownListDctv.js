define(["./module"],function(e){e.directive("dropdownList",["httpService","messageService",function(e,t){return{restrict:"AE",template:'<div><input type="text" ng-blur="blur()" class="{{inputClass}}"　 name="{{name}}" placeholder="{{placeholder}}" ng-model="val" value="{{val}}"  data-empty="{{empty}}" /><ion-scroll class="downList" ng-if="downListShow"><ul><li ng-click="choiceItem()" ng-repeat="item in list">{{item.name}}</li></ul></ion-scroll></div>',replace:!0,scope:{val:"="},link:function(t,n,i){t.inputClass=i.inputclass||"",t.placeholder=i.placeholder||"",t.empty=i.empty||"",t.name=i.name||"",n.bind("keyup",function(){if(t.val.length>2){var n=e.getData("./json/down-list.json",{q:t.val});n.then(function(e){return e.data.length>0?(t.list=e.data,void(t.downListShow=!0)):!1})}}),t.blur=function(){t.downListShow=!1},t.choiceItem=function(){t.val=this.item.name,t.downListShow=!1}}}}])});