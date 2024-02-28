/*
 * :file description: 
 * :name: \hand-write-js\quickSort.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-12-27 22:56:40
 * :last editor: PakJeon
 * :date last edited: 2023-12-27 23:00:29
 */
const quickSort = (arr) => {
	if (!arr.length) {
		return arr;
	}
	let left = 0;
	let right = arr.length - 1;
	let mid = Math.floor((left + right) / 2);
	let leftArr = [];
	let rightArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (i === mid) {
			continue;
		}
		if (arr[i] < arr[mid]) {
			leftArr.push(arr[i]);
		} else {
			rightArr.push(arr[i]);
		}
	}
	return quickSort(leftArr).concat([arr[mid]], quickSort(rightArr));
}