'use strict';

var app = angular.module('cgi-route', ['ui.router']);

var homeUrl = require('./tmpl/home.html');
var produitsUrl = require('./tmpl/produits.html');
var servicesUrl = require('./tmpl/services.html');
var contactUrl = require('./tmpl/contact.html');

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
	'ngInject';

	$locationProvider
		.html5Mode(true);

	var homeState = {
		name: 'home',
		url: '/',
		templateUrl: homeUrl
	}

	var produitState = {
		name: 'produits',
		url: '/produits',
		templateUrl: produitsUrl,
		controller: 'ProduitsCtrl',
		controllerAs: '$ctrl'
	}

	var serviceState = {
		name: 'services',
		url: '/services',
		templateUrl: servicesUrl
	}

	var contactState = {
		name: 'contact',
		url: '/contact',
		templateUrl: contactUrl,
		controller: function($rootScope) {
			'ngInject';
			var ctrl = this;
			ctrl.choses = $rootScope.choses;
			ctrl.affaires = $rootScope.affaires;
		},
		controllerAs: '$ctrl'
	}

	$stateProvider.state(homeState);
	$stateProvider.state(produitState);
	$stateProvider.state(serviceState);
	$stateProvider.state(contactState);
	$urlRouterProvider.otherwise('/');
});

app.controller('ProduitsCtrl', function ProduitsCtrl($http, $q) {
	'ngInject';
	console.log('ProduitsCtrl', arguments);
	var ctrl = this;
	ctrl.start = function() {
		console.log('start', arguments);
		$http.get('../ws/s1').then(function(response) {
			console.log('response', response);
			return $q.all([
				$http.get('../ws/s2').then(function(response) {
					return $http.get('../ws/s6');
				}),
				$http.get('../ws/s3'),
				$http.get('../ws/s4')
			]);
		}).then(function(responses) {
			console.log('responses', responses);
			return $http.get('../ws/s5');
		}).then(function(response) {
			console.log('response', response);
		}).catch(function(error) {
			console.error('error', error);
		});
	};


	
});

app.component('jlgList', {
		bindings: {
			type: '@',
			filtre: '<'
		},
		controller: function() {
			console.log('ctrl');
		},
		template: 'type={{$ctrl.type}}<div ng-repeat="obj in $root[$ctrl.type] | filter : {titre: $ctrl.filtre}">{{obj}}</div>'
	});
