(function() {
	'use strict';

	var app = angular.module('cgi-list', []);

	app.run(function($rootScope) {
		'ngInject';
		$rootScope.affaires = [];

		for (var i = 0; i < 10000; i++) {
			$rootScope.affaires.push({
				titre: 'coucou' + i,
				description: 'description' + i,
			});
		}
		console.log('$rootScope.affaires', $rootScope.affaires);
	});

	app.directive('cgiList', function() {
		return {
			restrict: 'E',
			controller: function CgiListCtrl($scope, $element, $attrs, $compile, $rootScope) {
				'ngInject';
				var ctrl = this;
				console.log('CgiListCtrl', arguments);
				var content = $element.html();
				$element.html('');

				console.log('content', content);

				ctrl.start = 0;

				window.onwheel = function() {
					console.log('mon scroll', arguments);
					ctrl.getMore();
				};

				ctrl.getMore = function() {
					var qty = $attrs.qty || 10;
					qty = Number(qty);


					for (var i = ctrl.start; i < ctrl.start + qty; i++) {
						var html = '';
						html += '<div>' + content + '</div>';
						var elt = angular.element(html);
						$element.append(elt);
						var scope = $scope.$new(false);
						var name = $attrs.name;
						scope[name] = $rootScope.affaires[i];
						$compile(elt)(scope);
					}
					ctrl.start += qty;

				}
				ctrl.getMore();

			}
		};
	});
})();