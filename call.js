/*
 * :file description: 
 * :name: \js-handwriting\deepJs\call.js
 * :author: PakJeon
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-07-15 23:06:46
 * :last editor: PakJeon
 * :date last edited: 2021-07-22 16:12:53
 */
/**
 * 模拟 call 实现
 */
Function.prototype.call2 = function (context) {
	context.fn = this;
	context.fn();
	delete context.fn;
}

Function.prototype.call2 = function (context) {
	context.fn = this;
	var args = [];
	for (var i = 1; len = arguments.length; i < len; i++) {
		args.push('arguments[' + 'i' + ']');
	}
	var res = eval('context.fn(' + args + ')');

	delete context.fn;
	return res;
}

Function.prototype.myCall = function (context) {
	const tmpContext = context || window;  // this参数可能传null，当为null时指向window
	tmpContext.fn = this; // 在被指向的对象context上增加属性fn，并赋值为当前想执行的函数
	const args = [];
	for (let i = 1; i < arguments.length; i++) {  // 把参数都放在数组中
		args.push('arguments[' + i + ']');
	}
	const result = eval('tmpContext.fn(' + args + ')');  // 数组隐式转字符串
	delete tmpContext.fn  // 把fn属性删除
	return result;
}