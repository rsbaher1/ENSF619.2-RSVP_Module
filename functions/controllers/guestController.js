/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const firebaseDB = require("../db.js");
const Guest = require("../models/guest");
const functions = require("firebase-functions");
const GuestCollection = firebaseDB.collection("guest");
 
const addGuest = async (req, res) => {
	try {
		let data = req.body;
		functions.logger.log("guest data:");
		functions.logger.log(data);

		let guestModel = new Guest(data.eventID, data.fullname, data.email, 
			data.isUnderage, data.isUnder12, data.weddingPartyPosition, 
			data.invitationID, data.rsvpStatus, data.rsvpMeal, null);
		functions.logger.log("guestModel:");
		functions.logger.log(guestModel);

		let guest_data = await GuestCollection.doc(guestModel.id).set(guestModel.toJSON());

		functions.logger.log("guest data:", guest_data);
		res.status(200).send("Successfully created Guest: " + guestModel.id);
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const updateGuest = async (req, res) => {
	try {
		const guestID = req.params.guest_id;
		let data = req.body;
		functions.logger.log("guest data:");
		functions.logger.log(data);

		let guestModel = new Guest(data.eventID, data.fullname, data.email, 
			data.isUnderage, data.isUnder12, data.weddingPartyPosition, 
			data.invitationID, data.rsvpStatus, data.rsvpMeal, guestID);
		functions.logger.log("guestModel:");
		functions.logger.log(guestModel);

		let guest_data = await GuestCollection.doc(guestModel.id).update(guestModel.toJSON());

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
				d.invitationID, d.rsvpStatus, d.rsvpMeal, null);
			let guest_data = await GuestCollection.doc(guestModel.id).set(guestModel.toJSON());
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
		const guest_data = await GuestCollection.orderBy("fullname").get();
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
		const guest_data = await GuestCollection.doc(guestID).get();
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
		const guest_data = await GuestCollection.where("eventID", "==", eventID).get();
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

const getGuestsByEmail = async (req, res) => {
	try {
		let body =  req.body;
		let email = body.email;
		functions.logger.log("body:");
		functions.logger.log(body);
		console.log("BODY: ", body)
		let guests =  await GuestCollection.where("email", "==", email).get();
		functions.logger.log("guests by email:");
		functions.logger.log(guests);

		if (guests.empty) {
			functions.logger.log("No document found by that email: " + email);
			res.status(404).send("No document found by that email: " + email);
		} else {
			const allGuests = guests.docs.map(doc => doc.data());
			guests.docs.forEach((ev) => {
				functions.logger.log(ev.id + " guest data: ", ev.data());
			});
			res.status(200).send(allGuests);
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getRsvpGuest = async (req, res) => {
	try {
		const rsvp_val =  parseInt(req.params.rsvp_val);
		const filter_key =  String(req.params.filter_key);
		let guests =  await GuestCollection.where("rsvpStatus", "==", rsvp_val).select(filter_key).get();
		functions.logger.log("guests by RSVP:");
		functions.logger.log(guests);

		if (guests.empty) {
			functions.logger.log("No Guests have RSVP'd");
			res.status(404).send("No Guests have RSVP'd");
		} else {
			const allGuests = guests.docs.map(doc => doc.data());
			//todo return unique vals
			guests.docs.forEach((ev) => {
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
	updateGuest,
	getGuestsByEmail,
	getRsvpGuest,
}
