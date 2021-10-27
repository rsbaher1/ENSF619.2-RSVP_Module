/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";
const crypto = require("crypto");

class Guest{
	// TODO: add Table number field
	constructor(eventID, fullname, email, isUnderage=0, isUnder12=0, inWeddingParty=0, weddingPartyPosition=null, invitationID=null, rsvpStatus=null, rsvpMeal=null) {
		this.id= crypto.randomUUID();
		this.eventID = eventID;
		this.fullname = fullname; 
		this.email = email; // to send invitiation
		this.isUnderage = isUnderage;
		this.isUnder12 = isUnder12;
		this.inWeddingParty = inWeddingParty;
		this.weddingPartyPosition = weddingPartyPosition;
		this.invitationID = invitationID; //For invitation organizing
		this.rsvpStatus = rsvpStatus;
		this.rsvpMeal = rsvpMeal;
	}

	toJSON(){
		return {
			"id": this.id,
			"eventID": this.eventID,
			"invitationID": this.invitationID,
			"fullname": this.fullname,
			"email": this.email,
			"isUnderage": this.isUnderage,
			"isUnder12": this.isUnder12,
			"inWeddingParty": this.inWeddingParty,
			"weddingPartyPosition": this.weddingPartyPosition,
			"rsvpStatus": this.rsvpStatus,
			"rsvpMeal": this.rsvpMeal
		};
	}
}

module.exports = Guest;