/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const firebaseDB = require("../db.js");
const EmailCode = require("../models/emailCode");
const functions = require("firebase-functions");
const EmailCode_Collection = firebaseDB.collection("EmailCode");

const addCode = async (req, res) => {
	try {
		if (req.method !== 'POST') {
			return res.status(400).send('Bad request, this endpoint only accepts POST requests');
		}
		else {
			let data = req.body;

			let emailCodeModel = new EmailCode(data.eventID, data.email);
			let EmailCode_data = await EmailCode_Collection.doc(emailCodeModel.id).set(emailCodeModel.toJSON());

			functions.logger.log("event data:", EmailCode_data);
			res.status(200).send("Successfully created Event: " + emailCodeModel.id);
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const updateCode = async (req, res) => {
	try {
		if (req.method !== 'PUT') {
			return res.status(400).send('Bad request, this endpoint only accepts PUT requests');
		}
		else {
			const ID = req.params.id;
			let data = req.body;

			let emailCodeModel = new EmailCode(data.eventID, data.email, ID);
			let EmailCode_data = await EmailCode_Collection.doc(emailCodeModel.id).update(emailCodeModel.toJSON());

			functions.logger.log("Email Code data updated:", EmailCode_data);
			res.status(200).send("Successfully Updated Code: " + emailCodeModel.id);
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getCode = async (req, res) => {
	try {
		if (req.method !== 'GET') {
			return res.status(400).send('Bad request, this endpoint only accepts GET requests');
		}
		else {
			const ID = req.params.id;
			const data = await EmailCode_Collection.doc(ID).get();
			functions.logger.log("Got Code:", data);

			if (data.empty) {
				functions.logger.log("No document found by that ID: " + ID);
				res.status(404).send("No document found by that ID: " + ID);
			} else {
				res.status(200).send(data.data());
			}
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getCodeByEvent = async (req, res) => {
	try {
		if (req.method !== 'GET') {
			return res.status(400).send('Bad request, this endpoint only accepts GET requests');
		}
		else {
			const ID = req.params.event_id;
			const data = await EmailCode_Collection.where("eventID", "==", ID).get();
			functions.logger.log("Got Codes:", data);

			if (data.empty) {
				functions.logger.log("No document found by that event ID: " + ID);
				res.status(404).send("No document found by that event ID: " + ID);
			} else {
				const allData = data.docs.map(doc => doc.data());
				res.status(200).send(allData);
			}
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}


module.exports = {
	addCode,
	updateCode,
	getCode,
	getCodeByEvent
}
