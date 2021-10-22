/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {Validator, ValidationError,} = require("express-json-validator-middleware");
const { validate } = new Validator();

function validationErrorMiddleware(error, request, response, next) {
	if (response.headersSent) {
		return next(error);
	}

	const isValidationError = error instanceof ValidationError;
	if (!isValidationError) {
		return next(error);
	}

	response.status(400).json({
		errors: error.validationErrors,
	});

	next();
}

const app = express();

app.use(cors({origin: true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(validationErrorMiddleware);

const {eventSchema, guestSchema} = require("./schema");
const eventRoutes = require("./routes/event-routes");
const guestRoutes = require("./routes/guest-routes");

app.use("/api", validate({body: eventSchema}), eventRoutes.routes);
app.use("/api", validate({body: guestSchema}), guestRoutes.routes);

exports.app = functions.https.onRequest(app);
