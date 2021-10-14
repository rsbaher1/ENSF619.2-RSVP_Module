/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const functions = require("firebase-functions");
//const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
//const config = require("./config.js");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({origin: true}));
app.use(express.json());
app.use(bodyParser.json());

const eventRoutes = require("./routes/event-routes");

app.use("/api", eventRoutes.routes);


exports.app = functions.https.onRequest(app);
