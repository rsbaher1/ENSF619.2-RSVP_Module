/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const firebaseDB = require("../db.js");
const Guest = require("../models/guest");
const functions = require("firebase-functions");
const e = require("express");
const GuestCollection = firebaseDB.collection("guest");

const addGuest = async (req, res) => {
	try {
		if (req.method !== 'POST') {
			return res.status(400).send('Bad request, this endpoint only accepts POST requests');
		}
		else {
			let data = req.body;
			functions.logger.log("addGuest data:");
			functions.logger.log(data);

			let guestModel = new Guest(data.eventID, data.fullname, data.email,
				data.isUnderage, data.isUnder12, data.weddingPartyPosition,
				data.invitationID, data.rsvpStatus, data.rsvpMeal, null);
			functions.logger.log("addGuest guestModel:");
			functions.logger.log(guestModel);

			let guest_data = await GuestCollection.doc(guestModel.id).set(guestModel.toJSON());

			functions.logger.log("addguest data:", guest_data);
			res.status(200).send("Successfully created Guest: " + guestModel.id);
		}

	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const updateGuest = async (req, res) => {
	try {
		if (req.method !== 'PUT') {
			return res.status(400).send('Bad request, this endpoint only accepts PUT requests');
		}
		else {
			const guestID = req.params.guest_id;
			let data = req.body;
			functions.logger.log("updateguest data:");
			functions.logger.log(data);

			let guestModel = new Guest(data.eventID, data.fullname, data.email,
				data.isUnderage, data.isUnder12, data.weddingPartyPosition,
				data.invitationID, data.rsvpStatus, data.rsvpMeal, guestID);
			functions.logger.log("update guestModel:");
			functions.logger.log(guestModel);

			let guest_data = await GuestCollection.doc(guestModel.id).update(guestModel.toJSON());

			functions.logger.log("update guest data:", guest_data);
			res.status(200).send("Successfully Updated Guest: " + guestModel.id);
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const addGuests = async (req, res) => {
	try {
		if (req.method !== 'POST') {
			return res.status(400).send('Bad request, this endpoint only accepts POST requests');
		}
		else {
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
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getAllGuests = async (req, res) => {
	try {
		if (req.method !== 'GET') {
			return res.status(400).send('Bad request, this endpoint only accepts GET requests');
		}
		else {
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
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getGuestByID = async (req, res) => {
	try {
		if (req.method !== 'GET') {
			return res.status(400).send('Bad request, this endpoint only accepts GET requests');
		}
		else {
			const guestID = req.params.guest_id;
			const guest_data = await GuestCollection.doc(guestID).get();
			functions.logger.log("guest by ID returned:");
			functions.logger.log(guest_data.data());

			if (guest_data.empty) {
				functions.logger.log("No Guest found by that ID: " + guestID);
				res.status(404).send("No Guest found by that ID: " + guestID);
			} else {
				res.status(200).send(guest_data.data());
			}
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getGuestByEventID = async (req, res) => {
	try {
		if (req.method !== 'GET') {
			return res.status(400).send('Bad request, this endpoint only accepts GET requests');
		}
		else {
			const eventID = req.params.event_id;
			const guest_data = await GuestCollection.where("eventID", "==", eventID).get();
			functions.logger.log("total guests by event:");
			functions.logger.log(guest_data);

			if (guest_data.empty) {
				functions.logger.log("No Guests found by that Event ID: " + eventID);
				res.status(404).send("No Guests found by that Event ID: " + eventID);
			} else {
				const allGuests = guest_data.docs.map(doc => doc.data());
				guest_data.docs.forEach((ev) => {
					functions.logger.log(ev.id + " guest data: ", ev.data());
				});
				res.status(200).send(allGuests);
			}
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getGuestsByEmail = async (req, res) => {
	try {
		if (req.method !== 'GET') {
			return res.status(400).send('Bad request, this endpoint only accepts GET requests');
		}
		else {
			let params = req.params;
			let email = params.email;
			functions.logger.log("params:", params);
			console.log("params: ", params)
			let guests = await GuestCollection.where("email", "==", email).get();
			functions.logger.log("guests by email:");
			functions.logger.log(guests);

			if (guests.empty) {
				functions.logger.log("No Guests found by that email: " + email);
				res.status(404).send("No Guests found by that email: " + email);
			} else {
				const allGuests = guests.docs.map(doc => doc.data());
				guests.docs.forEach((ev) => {
					functions.logger.log(ev.id + " guest data: ", ev.data());
				});
				res.status(200).send(allGuests);
			}
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getRsvpGuest = async (req, res) => {
	try {
		if (req.method !== 'GET') {
			return res.status(400).send('Bad request, this endpoint only accepts GET requests');
		}
		else {
			const rsvp_val = parseInt(req.params.rsvp_val);
			const filter_key = String(req.params.filter_key);

			let guests = null;
			if (filter_key == "0" || filter_key == 0 || filter_key == "") {
				guests = await GuestCollection.where("rsvpStatus", "==", rsvp_val).get();
			} else {
				guests = await GuestCollection.where("rsvpStatus", "==", rsvp_val).select(filter_key).get();
			}
			functions.logger.log("guests by RSVP res:");
			functions.logger.log(guests);

			if (guests.empty) {
				functions.logger.log("No Guests have RSVP'd");
				res.status(404).send("No Guests have RSVP'd");
			} else {
				let allGuests = [];
				if (filter_key != "0" && filter_key != 0 && filter_key != "") {
					allGuests = guests.docs.map(doc => doc.data()[filter_key]);
					functions.logger.log("Filtered Guest RSVP");
					functions.logger.log(allGuests);
					let unique = [...new Set(allGuests)];
					functions.logger.log("unique: ", { data: unique });
					res.status(200).send(unique);
				} else {
					allGuests = guests.docs.map(doc => doc.data());
					res.status(200).send(allGuests);
				}
			}
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
