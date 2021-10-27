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

const addGuests = async (req, res) => {
	try {
		let data = req.body.guestlist;
		let guestlist = []
		for (let d in data) {
			let guestModel = new Guest(d.eventID, d.fullname, d.email, 
				d.isUnderage, d.isUnder12, d.inWeddingParty,
				d.weddingPartyPosition, d.invitationID, 
				d.rsvpStatus, d.rsvpMeal);
			let guest_data = await firebaseDB.collection("guest").doc(guestModel.id).set(guestModel.toJSON());
			guestlist.push(guest_data);
			functions.logger.log("guest data:", guest_data);
		}
		res.status(200).send("Successfully created Guests: " + guestlist.length);
		
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
		res.status(200).send(guest_data.data());
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getGuestByID = async (req, res) => {
	try {
		const guestID = req.param.guest_id;
		const guest_data = await firebaseDB.collection("guest").get(guestID);
		functions.logger.log("Guest:", guest_data);
		res.status(200).send(guest_data.data());
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getGuestByEventID = async (req, res) => {
	try {
		const eventID = req.param.event_id;
		const guest_data = await firebaseDB.collection("guest").where("eventID", "==", eventID).get();
		functions.logger.log("Guest:", guest_data);
		res.status(200).send(guest_data.data());
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

module.exports = {
	addGuest,
	addGuests,
	getAllGuests,
	getGuestByID,
	getGuestByEventID,
}
