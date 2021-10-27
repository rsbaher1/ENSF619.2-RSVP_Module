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
		functions.logger.log("guest data:");
		functions.logger.log(data);

		let guestModel = new Guest(data.eventID, data.fullname, data.email, 
			data.isUnderage, data.isUnder12, data.weddingPartyPosition, 
			data.invitationID, data.rsvpStatus, data.rsvpMeal);
		functions.logger.log("guestModel:");
		functions.logger.log(guestModel);

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
				d.isUnderage, d.isUnder12, d.weddingPartyPosition, 
				d.invitationID, d.rsvpStatus, d.rsvpMeal);
			let guest_data = await firebaseDB.collection("guest").doc(guestModel.id).set(guestModel.toJSON());
			guestlist.push(guest_data);
			functions.logger.log("guest data: ");
			functions.logger.log(guest_data);
		}
		functions.logger.log("guest list: ");
		functions.logger.log(guestlist);
		res.status(200).send("Successfully created Guests: " + guestlist.length);
		
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getAllGuests = async (req, res) => {
	try {
		const guest_data = await firebaseDB.collection("guest").orderBy("fullname").get();
		functions.logger.log("total guests:");
		functions.logger.log(guest_data);
		
		if (guest_data.empty) {
			functions.logger.log("No Guests found");
			res.status(404).send("No Guests found");
		} else {
			const allGuests = guest_data.docs.map(doc => doc.data());
			guest_data.docs.forEach((ev) => {
				functions.logger.log(ev.id + " guest data: ", ev.data());
			});
			res.status(200).send(allGuests);
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getGuestByID = async (req, res) => {
	try {
		const guestID = req.params.guest_id;
		const guest_data = await firebaseDB.collection("guest").doc(guestID).get();
		functions.logger.log("guest returned:");
		functions.logger.log(guest_data.data());

		if (guest_data.empty) {
			functions.logger.log("No document found by that ID: " + guestID);
			res.status(404).send("No document found by that ID: " + guestID);
		} else {
			res.status(200).send(guest_data.data());
		}
		
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getGuestByEventID = async (req, res) => {
	try {
		const eventID = req.params.event_id;
		const guest_data = await firebaseDB.collection("guest").where("eventID", "==", eventID).get();
		functions.logger.log("total guests:");
		functions.logger.log(guest_data);

		if (guest_data.empty) {
			functions.logger.log("No document found by that Event ID: " + eventID);
			res.status(404).send("No document found by that Event ID: " + eventID);
		} else {
			const allGuests = guest_data.docs.map(doc => doc.data());
			guest_data.docs.forEach((ev) => {
				functions.logger.log(ev.id + " guest data: ", ev.data());
			});
			res.status(200).send(allGuests);
		}
		
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
