'use strict';

require('angular');
require('angular-mocks');

describe('cgi-list', function() {

	beforeEach(angular.mock.module('cgi-list'));

	describe('listeInfinie', function() {
		var service;


		beforeEach(inject(function($rootScope, listeInfinie) {
			service = listeInfinie;
			$rootScope.affaires = ['test1', 'test2'];
		}));


		it('should return one element', function() {

			var result = service.getMore(0, 1);

			expect(result).toEqual(['test1']);
		});
	});
});
