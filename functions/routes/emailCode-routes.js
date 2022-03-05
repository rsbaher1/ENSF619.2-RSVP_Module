/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const express = require("express");
const {
	addCode,
	updateCode,
	getCode,
	getCodeByEvent
} = require("../controllers/emailCodeController");
const validate = require("../validate");
const Schema = require("../schema/emailCode-schema.json");
const router = express.Router();

router.post("/email-code", validate({ body:Schema}), addCode);
router.get("/email-code/:id", getCode);
router.get("/email-code/event/:event_id", getCodeByEvent);
router.put("/email-code/:id", validate({ body:Schema}), updateCode);

module.exports = {
	routes: router,
}