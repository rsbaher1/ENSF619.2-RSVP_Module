/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
*/
"use strict";

//const functions = require("firebase-functions");
const admin = require("firebase-admin");
const config = require("./config.js");
const serviceAccount = require(config.PERMISSIONS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.DB_URL,
});

const db = admin.firestore();


//exports.db = db;
module.exports = db;
