/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const express = require("express");
const {addEvent, getAllEvents, getEventByID, getGuestList} = require("../controllers/eventController");
const {Validator} = require("express-json-validator-middleware");
const { validate } = new Validator();
const router = express.Router();

const EventSchema = {
	type: "object",
	required: ["title", "date", "descr"],
	properties:
	{
		id: {
			type: "string"
		},
		title: {
			type: "string"
		},
		date: {
			type: "string"
		},
		itenerary: {
			type: "array",
		},
		mealOptions: {
			type: "array"
		},
		descr: {
			type: "string"
		}
	}

};

router.post("/event", validate(EventSchema), addEvent);
router.get("/event", getAllEvents);
router.get("/event/:event_id", getEventByID);
router.get("/event/:event_id/guestlist", getGuestList);

module.exports = {
	routes: router,
}