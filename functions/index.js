const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({origin: true}));
const serviceAccount = require("../permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});

const db = admin.firestore();


app.get("/hello-world", (req, res) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  return res.status(200).send("Hello World!");
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


exports.app = functions.https.onRequest(app);
//export {admin, db, app}