/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const firebaseDB = require("../db.js");
const AuthModel = require("../models/auth");
const functions = require("firebase-functions");
const axios = require('axios');
const config = require("./config.js");

const login = async (req, res) => {
	try {
		if (req.method !== 'POST') {
			return res.status(400).send('Bad request, this endpoint only accepts POST requests');
		}
		else {
			let data = req.body;
			let SignInRes = await SignIn(data.email, data.pass);
			if (SignInRes.error){
				res.status(400).send(SignInRes.error.message)
			} else {
				res.status(200).send(SignInRes);
			}	
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
			let token = req.body.refreshToken;
			let res = await RefreshToken(token);
			if (res.error){
				res.status(400).send(res.error.message)
			} else {
				res.status(200).send(res);
			}
		}
	} catch (e) {
		functions.logger.log("Error:", e);
		res.status(400).send(e.message);
	}
}

const SignIn = async (email, pass) => {
	axios.post(config.SignIn_URI, {
	  email: email,
	  password: pass
	})
	.then(res => {
	  console.log(`SignIN URI statusCode: ${res.status}`)
	  return res.body;
	})
	.catch(error => {
	  console.error(error)
	  return {error: error}
	})
}

const RefreshToken = async (token) => {
	axios.post(config.RefreshToken_URI, {
	grant_type: "refresh_token",
	refresh_token: token
	})
	.then(res => {
	  console.log(`Refresh URI statusCode: ${res.status}`)
	  return res.body;
	})
	.catch(error => {
	  console.error(error)
	  return {error: error}
	})
}

module.exports = {
	login,
	getToken
}
