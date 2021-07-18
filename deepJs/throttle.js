/*
 * :file description: 
 * :name: /js-handwriting/deepJs/throttle.js
 * :author: PakJeon
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-07-18 21:41:52
 * :last editor: PakJeon
 * :date last edited: 2021-07-18 22:28:45
 */

// 第一版 使用时间戳 (会立即执行，在停止触发后不会再执行)
function throttle1(func, wait) {
	var context, args;
	var previous = 0;
	return function () {
		var now = +new Date();
		context = this;
		args = arguments;
		if (now - previous > wait) {
			func.apply(context, args);
			previous = now;
		}
	}
}

// 第二版 使用计时器 (会在n秒后第一次执行，在停止触发后依然会再执行一次)
function throttle2(func, wait) {
	var timeout;
	return function () {
		var context = this;
		var args = arguments;
		if (!timeout) {
			timeout = setTimeout(function () {
				timeout = null;
				func.apply(context, args);
			}, wait);
		}
	}
}

// 第三版 双剑合璧
function throttle3(func, wait) {
	var timeout, context, args, result;
	var previous = 0;
	
	var later = function() {
		previous = +new Date();
		timeout = null;
		func.apply(context, args);
	}

	var throttled = function () {
		var now = +new Date();
		// 下次触发 func 剩余的时间
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		// 如果没有剩余的时间了 或者 你改了系统时间
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			func.apply(context, args);
		} else if (!timeout) {
			timeout = setTimeout(later, remaining);
		}
	}
	return throttled;
}

// 第四版 优化
// 设置个 options 作为第三个参数，然后根据传的值判断到底哪种效果，我们约定:
// leading：false 表示禁用第一次执行
// trailing: false 表示禁用停止触发的回调
// 加入取消功能
function throttle4(func, wait, options) {
	var timeout, context, args, result;
	var previous = 0;
	if (!options) {
		options = {};
	}

	var late = function () {
		previous = options.leading === false ? 0 : new Date().getTime();
		timeout = null;
		func.apply(context, args);
		if (!timeout) {
			context = args = null;
		}
	}

	var throttled = function () {
		var now = new Date().getTime();
		if (!previous && options.leading === false) {
			previous = now;
		}
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			func.apply(context, args);
			if (!timeout) {
				context = args = null;
			}
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
	}
	throttled.cancel = function () {
		clearTimeout(timeout);
		previous = 0;
		timeout = null;
	}

	return throttled;
}