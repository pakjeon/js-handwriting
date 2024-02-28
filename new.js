/*
 * :file description: 
 * :name: /js-handwriting/deepJs/new.js
 * :author: PakJeon
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-07-18 10:45:25
 * :last editor: PakJeon
 * :date last edited: 2021-07-18 10:48:15
 */
function objectFactory() {
	var obj = Object.create(null);

	Constructor = [].shift.call(arguments);

	obj.__proto__ = Constructor.prototype;

	var ret = Constructor.apply(obj, arguments);

	return typeof ret === 'object' ? ret : obj;
}