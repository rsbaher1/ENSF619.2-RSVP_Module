/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const express = require("express");
const {addEvent} = require("../controllers/eventController");

const router = express.Router();

router.post("/event", addEvent);

module.exports = {
	routes: router,
}