
define(['./module'], function(directives) {
	directives.directive('downList', ['httpService', 'messageService', function(httpService, messageService) {
		return {
			restrict: 'AE',
            template: '<div>' +
                        '<input type="text" class="{{inputClass}}"　 name="{{name}}" placeholder="{{placeholder}}" ng-model="val" value="{{val}}"  data-empty="{{empty}}" />' +
                        '<ion-scroll class="downList" ng-if="downListShow">' +
                            '<ul>' +
                                '<li ng-click="choiceItem()" ng-repeat="item in list">{{item.name}}</li>' +
                            '</ul>' +
                        '</ion-scroll>' +
                      '</div>',
            replace: true,
            scope: {
                val: '='
            },
            link: function (scope, elem, attrs) {
                scope.inputClass = attrs.inputclass || '';
                scope.placeholder = attrs.placeholder || '';
                scope.empty = attrs.empty || '';
                scope.name = attrs.name || '';
                elem.bind('keyup', function () {
                    if(scope.val.length > 2) {
                        var promise = httpService.getData('./json/down-list.json', {'q': scope.val});
                        promise.then(function(data) {
                            if(data.data.length > 0) {
                            　　　　scope.list = data.data;
                               　scope.downListShow　= true;
                            }
                        });
                    }
                });
                scope.choiceItem = function() {
                    scope.val = this.item.name;
                    scope.downListShow　= false;
                };
            }    
		};
	}]);
});