/*
 * :file description: 
 * :name: /js-handwriting/deepJs/apply.js
 * :author: PakJeon
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-07-15 23:21:57
 * :last editor: PakJeon
 * :date last edited: 2021-07-15 23:25:26
 */
Function.prototype.myApply = function (context, arr) {
	var context = Object(context) || window;
	context.fn = this;

	let result;
	if (!arr) {
		result = context.fn();
	} else {
		var args = [];
		for (var i = 0; i < arr.length; i++) {
			args.push('arr[' + i + ']');
		}
		result = eval('context.fn(' + arr + ')');
	}

	delete context.fn;
	return result;
}