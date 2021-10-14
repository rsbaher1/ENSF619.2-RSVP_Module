/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
	DB_URL,
	PERMISSIONS,
} = process.env;

assert(DB_URL, "Firebase DB URL is required.");
assert(PERMISSIONS, "Firebase Permissions file is required.");

module.exports = {	
  DB_URL: DB_URL,
  PERMISSIONS: PERMISSIONS,
}