/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const express = require("express");
const {addGuest, getGuestByID, getAllGuests, addGuests, getGuestByEventID} = require("../controllers/guestController");
const {Validator} = require("express-json-validator-middleware");
const { validate } = new Validator();
const router = express.Router();

const GuestSchema = {
	type: "object",
	required: ["fullname", "email", "eventID"],
	properties: {
		id: {
			type: "string"
		},
		invitationID: {
			type: "string"
		},
		eventID: {
			type: "string"
		},
		fullname: {
			type: "string"
		},
		email: {
			type: "string"
		},
		isUnderage: {
			type: "integer",
			default: 0,
			enum: [0, 1]
		},
		isUnder12: {
			type: "integer",
			default: 0,
			enum: [0, 1]
		},
		weddingPartyPosition: {
			type: "string",
			default: 0,
			enum: [0, 1, 2, 3, 4, 5, 6, 7]
		},
		rsvpStatus: {
			type: "integer",
			default: 0,
			enum: [0, 1, 2]
		},
		rsvpMeal: {
			type: "string"
		}
	}

};

router.post("/guest", validate(GuestSchema), addGuest);
router.post("/guest/multiple", addGuests);
router.get("/guest/:guest_id", getGuestByID);
router.get("/guest", getAllGuests);
router.get("/guest/event/:event_id", getGuestByEventID);

module.exports = {
	routes: router,
}