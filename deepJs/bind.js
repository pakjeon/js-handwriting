/*
 * :file description: 
 * :name: /js-handwriting/deepJs/bind.js
 * :author: PakJeon
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-07-18 10:26:44
 * :last editor: PakJeon
 * :date last edited: 2021-07-18 10:32:50
 */
Function.prototype.myBind = function (context) {
	if (typeof this !== "function") {
		throw new Error("Function.prototype.myBind - what is trying to be bound is not callable");
	}
	var self = this;
	var args = Array.prototype.slice.call(arguments, 1);

	var fNOP = function () { };

	var fBound = function () {
		var bindArgs = Array.prototype.slice.call(arguments);
		// 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
		// 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
		return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
	}

	fNOP.prototype = this.prototype;
	fBound.prototype = new fNOP();
	return fBound;
}