"use strict";

const Readable = require("stream").Readable;
const Writable = require("stream").Writable;
const Transform = require("stream").Transform;

class CReadable extends Readable{
	random (min, max){
		min = Math.ceil(min);
		max = Math.floor(max);
		max = Math.floor(Math.random() * (max - min + 1));
		return max + min;
	}

	_read(){
		this.push(this.random(0, 100).toString());
	}
}

class CWritable extends Writable{
	_write(chunk, encoding, callback){
		console.log(chunk.toString());
		callback();
	}
}

class CTransform extends Transform{
	_transform(chunk, encodind, callback){
		setTimeout(() => {
			this.push("--" + chunk.toString() + "--");
			callback();
		}, 1000);
	}
}

(new CReadable())
	.pipe(new CTransform())
	.pipe(new CWritable());