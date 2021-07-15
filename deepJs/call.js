/*
 * :file description: 
 * :name: /js-handwriting/deepJs/call.js
 * :author: PakJeon
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-07-15 23:06:46
 * :last editor: PakJeon
 * :date last edited: 2021-07-15 23:19:58
 */
Function.prototype.myCall = function (context) {
	const tmpContext = context || window;  // this参数可能传null，当为null时指向window
	tmpContext.fn = this; // 在被指向的对象context上增加属性fn，并赋值为当前想执行的函数
	const args = [];
	for (let i = 1; i < arguments.length; i++) {  // 把参数都放在数组中
		args.push('arguments[' + i + ']');
	}
	const result = eval('context.fn(' + args + ')');  // 数组隐式转字符串
	delete tmpContext.fn  // 把fn属性删除
	return result;
}