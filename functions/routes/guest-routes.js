/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const express = require("express");
const {addGuest, getGuestByID, getAllGuests, addGuests, getGuestByEventID, updateGuest, 
	getGuestsByEmail, getRsvpGuest} = require("../controllers/guestController");
const router = express.Router();
const validate = require("../validate");
const GuestSchema = require("../schema/guest-schema.json");

router.post("/guest", validate({ body: GuestSchema}), addGuest);
router.post("/guest/multiple", addGuests);
router.get("/guest/:guest_id", getGuestByID);
router.put("/guest/:guest_id", validate({ body: GuestSchema}), updateGuest);
router.get("/guest", getAllGuests);
router.get("/guest/rsvp/:rsvp_val/:filter_key", getRsvpGuest);
router.get("/guest/email", getGuestsByEmail);
router.get("/guest/event/:event_id", getGuestByEventID);

module.exports = {
	routes: router,
}