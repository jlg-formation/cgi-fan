'use strict';

require('./style.scss');

require('angular');
require('angular-ui-router');
require('./cgi-list/cgi-list.js');
require('./cgi-route/cgi-route.js');

var app = angular.module('main', ['cgi-list', 'cgi-route']);

app.config(function() {
	console.log('config main');
});

app.run(function() {
	console.log('run main');
});

var cgiHeaderUrl = require('./tmpl/cgi-header.html');
var cgiBodyUrl = require('./tmpl/cgi-body.html');
var cgiFooterUrl = require('./tmpl/cgi-footer.html');

app.directive('cgiHeader', function() {
	return {
		restrict: 'E',
		templateUrl: cgiHeaderUrl,
	};
});
app.directive('cgiBody', function() {
	return {
		restrict: 'E',
		templateUrl: cgiBodyUrl,
	};
});
app.directive('cgiFooter', function() {
	return {
		restrict: 'E',
		templateUrl: cgiFooterUrl,
	};
});
