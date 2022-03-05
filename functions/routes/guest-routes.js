/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const express = require("express");
const router = express.Router();
const validate = require("../validate");
const GuestSchema = require("../schema/guest-schema.json");
const {addGuest, getGuestByID, getAllGuests, addGuests, getGuestByEventID, updateGuest, 
	getGuestsByEmail, getRsvpGuest} = require("../controllers/guestController");

router.post("/guest", validate({ body: GuestSchema}), addGuest);
router.post("/guest/multiple", addGuests);
router.put("/guest/:guest_id", validate({ body: GuestSchema}), updateGuest);

router.get("/guest", getAllGuests);
router.get("/guest/:guest_id", getGuestByID);
router.get("/guest-email/:email", getGuestsByEmail);
router.get("/guest/event/:event_id", getGuestByEventID);
router.get("/guest/rsvp/:rsvp_val/:filter_key", getRsvpGuest);

module.exports = {
	routes: router,
}