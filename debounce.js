/*
 * :file description: 
 * :name: /js-handwriting/deepJs/debounce.js
 * :author: PakJeon
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-07-18 15:21:13
 * :last editor: PakJeon
 * :date last edited: 2021-07-18 21:24:40
 */

// 第一版
function debounce1(func, wait) {
	var timeout;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(func, wait);
	}
}

// 第二版 修复this指向
function debounce2(func, wait) {
	var timeout;
	
	return function () {
		var context = this;
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			func.apply(context);
		}, wait);
	}
}

// 第三版 修复参数传递
function debounce3(func, wait) {
	var timeout;

	return function () {
		var context = this;
		var args = arguments;

		clearTimeout(timeout);
		timeout = setTimeout(function () {
			func.apply(context, args);
		}, wait);
	}
}

// 第四版 加入是否立即执行参数
function debounce4(func, wait, immediate) {
	var timeout;

	return function () {
		var context = this;
		var args = arguments;

		if (timeout) {
			clearTimeout(timeout);
		}

		if (immediate) {
			// 如果已经执行过，不再执行
			var callnow = !timeout;
			timeout = setTimeout(function () {
				timeout = null;
			}, wait);
			if (callnow) {
				func.apply(context, args);
			}
		} else {
			timeout = setTimeout(function () {
				func.apply(context, args);
			}, wait);
		}

	}
}

// 第五版 带返回值
function debounce5(func, wait, immediate) {
	var timeout, result;
	return function () {
		var args = arguments;
		var context = this;
		if (timeout) {
			clearTimeout(timeout);
		}
		if (immediate) {
			var callnow = !timeout;
			timeout = setTimeout(function () {
				timeout = null;
			}, wait);
			if (callnow) {
				result = func.apply(context, args);
			}
		} else {
			timeout = setTimeout(function () {
				func.apply(context, args);
			}, wait);
		}
		return result;
	}
}

// 第六版 带取消功能
function debounce6(func, wait, immediate) {
	var timeout, result;
	var debounce = function () {
		var args = arguments;
		var context = this;
		if (timeout) {
			clearTimeout(timeout);
		}
		if (immediate) {
			var callnow = !timeout;
			timeout = setTimeout(function () {
				timeout = null;
			}, wait);
			if (callnow) {
				result = func.apply(context, arguments);
			}
		} else {
			timeout = setTimeout(function () {
				func.apply(context, args);
			}, wait)
		}
		return result;
	}

	debounce.cancel = function () {
		clearTimeout(timeout);
		timeout = null;
	}
}