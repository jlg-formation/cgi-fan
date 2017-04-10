(function() {
	'use strict';

	var a = {
		d: 34,
		e: 'coucou',
		z: {
			x: 888
		}
	};
	var b = clone(a);
	console.log('a', a);
	console.log('b', b);

	b.d = 56;
	b.z.x = 666;
	console.log('a', a);
	console.log('b', b);

	function clone(o) {
		var result = {};
		for (var p in o) {
			if (o[p] !== null && typeof o[p] === 'object') {
				result[p] = clone(o[p]);
			} else {
				result[p] = o[p];
			}
		}
		return result;
	}
})();
