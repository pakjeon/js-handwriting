/**
 * 深浅拷贝
 */

function clone(obj) {
	return Object.assign({}, obj);
}

function clone2(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function clone3(obj) {

}

function deepClone(obj) {
	if (typeof obj !== 'object') {
		return;
	}
	var newObj = obj instanceof Array ? [] : {};
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
		}
	}
	return newObj;
}