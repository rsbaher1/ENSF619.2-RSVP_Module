/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const firebaseDB = require("../db.js");
const AuthModel = require("../models/auth");
const functions = require("firebase-functions");

const login = async (req, res) => {
	try {
		if (req.method !== 'POST') {
			return res.status(400).send('Bad request, this endpoint only accepts POST requests');
		}
		else {
			let data = req.body;

			let emailCodeModel = new AuthModel(data.email, data.pass);

			res.status(200).send("Successfully created Event: " + emailCodeModel.id);
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const getToken = async (req, res) => {
	try {
		if (req.method !== 'POST') {
			return res.status(400).send('Bad request, this endpoint only accepts POST requests');
		}
		else {
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

module.exports = {
	login,
	getToken
}
