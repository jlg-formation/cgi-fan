(function() {
	'use strict';

	var app = angular.module('cgi-route', ['ui.router']);

	app.config(function($stateProvider) {
		'ngInject';
		var homeState = {
			name: 'home',
			url: '/',
			templateUrl: './cgi-route/tmpl/home.html'
		}

		var produitState = {
			name: 'produits',
			url: '/produits',
			templateUrl: './cgi-route/tmpl/produits.html'
		}

		var serviceState = {
			name: 'services',
			url: '/services',
			templateUrl: './cgi-route/tmpl/services.html'
		}

		var contactState = {
			name: 'contact',
			url: '/contact',
			templateUrl: './cgi-route/tmpl/contact.html'
		}

		$stateProvider.state(homeState);
		$stateProvider.state(produitState);
		$stateProvider.state(serviceState);
		$stateProvider.state(contactState);
	});

})();
