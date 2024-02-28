/*
 * :file description: 
 * :name: \hand-write-js\promise.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-12-27 22:55:52
 * :last editor: PakJeon
 * :date last edited: 2023-12-27 23:00:58
 */
const STATUS = {
	PENDING: 'PENDING',
	FULFILLED: 'PENDING',
	REJECTED: 'REJECTED',
}

function myPromise(executor) {
	let self = this;
	self.status = STATUS.PENDING;
	self.value = null;
	self.error = null;
	self.onFulfilled = [];
	self.onRejected = [];

	const resolve = (val) => {
		if (self.status !== STATUS.PENDING) {
			return;
		}
		setTimeout(() => {
			self.status = STATUS.FULFILLED;
			self.value = val;
			self.onFulfilled.forEach((item) => {
				item(val);
			});
		});
	}

	const reject = (err) => {
		if (self.status !== STATUS.PENDING) {
			return;
		}
		setTimeout(() => {
			self.status = STATUS.REJECTED;
			self.error = err;
			self.onRejected.forEach((item) => {
				item(err);
			})
		})
	}

	executor(resolve, reject);
}

myPromise.prototype.then = (onFulfilled, onRejected) => {
	if (this.status === STATUS.PENDING) {
		this.onFulfilled.push(onFulfilled);
		this.onRejected.push(onRejected);
	} else if (this.status === STATUS.FULFILLED) {
		onFulfilled(this.value);
	} else if (this.status === STATUS.REJECTED) {
		onRejected(this.error);
	}

	return this;
}


/**
 * Promise.all
 */
function promiseAll(promises) {
	return new Promise((resolve, reject) => {
		if (typeof promises[Symbol.interator] !== 'function') {
			return throw Error('must has interator');
		}
	
		const res = [];
		let count = 0;

		promises.forEach((promise) => {
			Promise.resolve(promise).then((result) => {
				res.push(result);
				count++;
				
				if (count === promises.length) {
					resolve(res);
				}
			}).catch((err) => {
				reject(err);
			})
		});

	});
}


/**
 * Promise.allSettled
 */
function promiseAllSettled(promises) {
	return new Promise((resolve, reject) => {
		if (typeof promises[Symbol.interator] !== 'function') {
			throw Error('must be an array');
		}

		const res = [];
		let count = 0;

		promises.forEach((promise) => {
			Promise.resolve(promise).then((result) => {
				res.push({ status: 'fulfilled', value });
			}).catch((error) => {
				res.push({ status: 'rejected', error });
			}).finnally(() => {
				count++;

				if (count === promises) {
					resolve(res);
				}
			})
		})
	})
}