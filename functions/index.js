/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const {ValidationError} = require("express-json-validator-middleware");

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
app.use(validationErrorMiddleware);

const eventRoutes = require("./routes/event-routes");
const guestRoutes = require("./routes/guest-routes");
const emailCodeRoutes = require("./routes/emailCode-routes");
const authRoutes = require("./routes/auth-routes");

app.use("/api", eventRoutes.routes);
app.use("/api", guestRoutes.routes);
app.use("/api", emailCodeRoutes.routes);
app.use("/api", authRoutes.routes);

exports.app = functions.https.onRequest(app);
