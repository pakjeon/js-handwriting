/**
 * 数组扁平化
 */
function flatten(arr = []) {
	return arr.reduce((prev, cur) => {
		return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
	 }, []);
}

function flatten2(arr = []) {
	var str = JSON.stringify(arr);
	var replaceStr = str.replaceAll('[', '').replaceAll(']', '');
	return replaceStr.split(',');
}