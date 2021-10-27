/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const {Validator} = require("express-json-validator-middleware");
const { validate } = new Validator();

module.exports = validate;