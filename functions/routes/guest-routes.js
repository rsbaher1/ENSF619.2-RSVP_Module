/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const express = require("express");
const {addGuest, getGuestByID, getAllGuests, addGuests, getGuestByEventID} = require("../controllers/guestController");
const router = express.Router();
const validate = require("../validate");
const GuestSchema = require("../schema/guest-schema.json");

router.post("/guest", validate({ body: GuestSchema}), addGuest);
router.post("/guest/multiple", addGuests);
router.get("/guest/:guest_id", getGuestByID);
router.get("/guest", getAllGuests);
router.get("/guest/event/:event_id", getGuestByEventID);

module.exports = {
	routes: router,
}