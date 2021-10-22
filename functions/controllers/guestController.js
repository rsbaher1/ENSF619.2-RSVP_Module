/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const firebaseDB = require("../db.js");
const Guest = require("../models/guest");
const functions = require("firebase-functions");

 
const addGuest = async (req, res) => {
	try {
		let data = req.body;

		let guestModel = new Guest(data.eventID, data.fullname, data.email, 
			data.isUnderage, data.isUnder12, data.inWeddingParty,
			data.weddingPartyPosition, data.invitationID, 
			data.rsvpStatus, data.rsvpMeal);
		let guest_data = await firebaseDB.collection("guest").doc(guestModel.id).set(guestModel.toJSON());

		functions.logger.log("guest data:", guest_data);
		res.status(200).send("Successfully created Guest: " + guestModel.id);
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getAllGuests = async (req, res) => {
	try {
		const guest_data = await firebaseDB.collection("guest").get();
		functions.logger.log("total guests:", guest_data);
		guest_data.forEach((ev) => {
			functions.logger.log(ev.id + " guest data: ", ev.data());
		});
		res.status(200).send(guest_data);
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getGuestByID = async (req, res) => {
	try {
		const guestID = req.body.id;
		const guest_data = await firebaseDB.collection("guest").get(guestID);
		functions.logger.log("Guest:", guest_data);
		res.status(200).send(guest_data);
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getGuestByEventID = async (req, res) => {
	try {
		const eventID = req.body.eventID;
		const guest_data = await firebaseDB.collection("guest").get().where({"eventID": eventID});
		functions.logger.log("Guest:", guest_data);
		res.status(200).send(guest_data);
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

module.exports = {
	addGuest,
	getAllGuests,
	getGuestByID,
	getGuestByEventID,
}
