/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const express = require("express");
const {addEvent, getAllEvents, getEventByID, getGuestList, updateEvent} = require("../controllers/eventController");
const router = express.Router();
const validate = require("../validate");
const EventSchema = require("../schema/event-schema.json");

router.post("/event", validate({ body: EventSchema}), addEvent);
router.get("/event", getAllEvents);
router.get("/event/:event_id", getEventByID);
router.put("/event/:event_id", validate({ body: EventSchema}), updateEvent);
router.get("/event/:event_id/guestlist", getGuestList);

module.exports = {
	routes: router,
}