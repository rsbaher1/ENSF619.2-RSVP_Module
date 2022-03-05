/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const express = require("express");
const {
	login,
	getToken,
} = require("../controllers/emailCodeController");
const validate = require("../validate");
const Schema = require("../schema/auth-schema.json");
const Schema2 = require("../schema/authToken-schema.json");
const router = express.Router();

router.post("/auth", validate({ body:Schema}), login);
router.post("/auth/token", validate({ body:Schema2}), getToken);

module.exports = {
	routes: router,
}