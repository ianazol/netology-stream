"use strict";

const Transform = require("stream").Transform;
const crypto = require('crypto');

const fs = require("fs");
const input = fs.createReadStream("input.txt");
const output = fs.createWriteStream("output.txt");

class md5Transform extends Transform{
	constructor(options){
		super(options);
		this.hash = crypto.createHash('md5');
	}

	_transform(chunk, encoding, callback){
		this.hash.update(chunk);
		callback();
	}

	_flush(callback){
		let hex = this.hash.digest('hex');
		this.push(hex);
		callback();
	}
}

input.pipe(new md5Transform()).pipe(output);
input.pipe(new md5Transform()).pipe(process.stdout);