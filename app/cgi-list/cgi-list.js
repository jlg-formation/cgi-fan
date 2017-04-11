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
			controller: function CgiListCtrl() {
				console.log('CgiListCtrl', arguments);
			}
		};
	});
})();
