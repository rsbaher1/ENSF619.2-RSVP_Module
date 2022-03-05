/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";
const crypto = require("crypto");

class EmailCode{
 
	// TODO: add Table number field
	constructor(eventID, email, id=null) {
		if (id == null) {
			this.id= crypto.randomUUID();
		} else {
			this.id = id;
		}
		this.code = crypto.randomBytes(5).toString('hex');
		this.eventID = eventID;
		this.email = email; 
	}

	toJSON(){
		return {
			"id": this.id,
			"code": this.code,
			"eventID": this.eventID,
			"email": this.email
		};
	}
}

module.exports = EmailCode;