/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const firebaseDB = require("../db.js");
const Event = require("../models/event");
const functions = require("firebase-functions");
const Event_Collection = firebaseDB.collection("event");
 
const addEvent = async (req, res) => {
	try {
		let data = req.body;

		let eventModel = new Event(data.title, data.date, data.descr, data.mealOptions, data.itenerary, null);
		let event_data = await Event_Collection.doc(eventModel.id).set(eventModel.toJSON());

		functions.logger.log("event data:", event_data);
		res.status(200).send("Successfully created Event: " + eventModel.id);
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const updateEvent = async (req, res) => {
	try {
		const eventID = req.params.event_id;
		let data = req.body;

		let eventModel = new Event(data.title, data.date, data.descr, data.mealOptions, data.itenerary, eventID);
		let event_data = await Event_Collection.doc(eventModel.id).update(eventModel.toJSON());

		functions.logger.log("event data updated:", event_data);
		res.status(200).send("Successfully Updated Event: " + eventModel.id);
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getAllEvents = async (req, res) => {
	try {
		const event_data = await Event_Collection.orderBy("id").get();
		functions.logger.log("total events:", event_data);
		const allEvents = event_data.docs.map(doc => doc.data());
		functions.logger.log("total events data:", allEvents);
		
		allEvents.forEach((ev) => {
			functions.logger.log(ev.id + " event data: ", ev);
		});
		res.status(200).send(allEvents);
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getEventByID = async (req, res) => {
	try {
		const eventID = req.params.event_id;
		functions.logger.log("params Event id:", eventID);
		const event_data = await Event_Collection.doc(eventID).get();
		functions.logger.log("Event data:", event_data);
		functions.logger.log("Event id:", event_data.id);
		functions.logger.log("Event data.data:", event_data.data());

		if (event_data.empty) {
			functions.logger.log("No document found by that ID: " + eventID);
			res.status(404).send("No document found by that ID: " + eventID);
		} else {
			res.status(200).send(event_data.data());
		}
		
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getGuestList = async(req, res) => {
	try {
		const eventID = req.params.event_id;
		const data = await firebaseDB.collection("guest").where("eventID", "==", eventID).get();
		functions.logger.log("Event:", data.data());
		
		if (data.empty) {
			functions.logger.log("No document found by that Event ID: " + eventID);
			res.status(404).send("No document found by that Event ID: " + eventID);
		} else {
			res.status(200).send(data.data());
		}
	
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}


module.exports = {
	addEvent,
	getAllEvents,
	getEventByID,
	getGuestList,
	updateEvent,
}
