/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const firebaseDB = require("../db.js");
//const Event = require("../models/event");
const functions = require("firebase-functions");

 
const addEvent = async (req, res) => {
	try {
		const data = req.body;
		const event_data = await firebaseDB.collection("event").doc().set(data);
		functions.logger.log("event data:", event_data);
		res.status(200).send("Successfully created Event: " + data.id);
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getAllEvents = async (req, res) => {
	try {
		const event_data = await firebaseDB.collection("event").get();
		functions.logger.log("total events:", event_data);
		event_data.forEach((ev) => {
			functions.logger.log(ev.id, " event data: ", ev.data());
		});
		res.status(200).send(event_data.length);
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

module.exports = {
	addEvent,
	getAllEvents,
}
