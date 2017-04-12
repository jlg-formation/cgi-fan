'use strict';

var app = angular.module('cgi-list', []);

app.config(function() {
	console.log('config cgi-list');
});

app.run(function() {
	console.log('run cgi-list');
});

app.run(function($rootScope) {
	'ngInject';
	$rootScope.affaires = [];
	$rootScope.choses = [];

	for (var i = 0; i < 2000; i++) {
		$rootScope.affaires.push({
			titre: 'coucou' + i,
			description: 'description' + i,
		});
		$rootScope.choses.push({
			titre: 'coucou' + i,
			description: 'chose' + i,
		});
	}
	// console.log('$rootScope.affaires', $rootScope.affaires);
});

app.service('listeInfinie', function ListeInfinie($rootScope) {
	'ngInject';
	this.getMore = function(start, qty, tableName) {
		qty = Number(qty);
		if (isNaN(qty)) {
			console.error('qty is not a number: ', qty);
			return;
		}
		var result = $rootScope[tableName].slice(start, start + qty);
		start += qty;
		return result;
	}
});

app.service('debounce', function Debounce() {
	var map = {};
	this.run = function(name, offset, callback) {
		if (!map[name]) {
			map[name] = {};
		}
		if (!map[name].lastCall) {
			map[name].lastCall = new Date().getTime();
			callback();
			return;
		}
		if (map[name].lastCall > new Date().getTime() - offset) {
			return;
		}
		map[name].lastCall = new Date().getTime();
		callback();
		return;
	}
});

app.component('cgiList', {
	bindings: {
		href: '@',
		qty: '@',
		name: '@',
		tableName: '@',
		kiki: '<?'
	},
	controller: function CgiListCtrl($scope,
		$element, $compile, $rootScope, listeInfinie, debounce) {
		'ngInject';
		var ctrl = this;
		console.log('CgiListCtrl', arguments);

		window.onwheel = function() {
			console.log('mon scroll', arguments);
			debounce.run('cgiList', ctrl.offset, ctrl.getMore);
			$scope.$apply();
		};
		var content;
		ctrl.$onInit = function() {
			content = $element.html();
			$element.html('');
			

			console.log('content', content);
			ctrl.offset = 5000;
			ctrl.start = 0;
			ctrl.getMore();
		};

		ctrl.getMore = function() {

			var qty = ctrl.qty || 10;
			qty = Number(qty);

			var array = listeInfinie.getMore(ctrl.start, qty, ctrl.tableName);
			ctrl.start += qty;
			for (var i = 0; i < qty; i++) {
				var html = '';
				html += '<div>' + content + '</div>';
				var elt = angular.element(html);
				$element.append(elt);
				var scope = $scope.$new(false);
				var name = ctrl.name;
				scope[name] = array[i];
				$compile(elt)(scope);
			}
		}
	}
});
