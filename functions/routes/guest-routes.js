/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const express = require("express");
const {addGuest} = require("../controllers/guestController");

const router = express.Router();

router.post("/guest", addGuest);

module.exports = {
	routes: router,
}