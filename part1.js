"use strict";

const fs = require("fs");
const crypto = require('crypto');

const input = fs.createReadStream("input.txt");
const output = fs.createWriteStream("output.txt");

const hash = crypto.createHash('md5');

input.pipe(hash).pipe(process.stdout);
input.pipe(hash).pipe(output);