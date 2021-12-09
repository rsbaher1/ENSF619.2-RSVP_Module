/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";
const crypto = require("crypto");
/*const weddingPartyPositionDic = {
	0: "Guest",
	1: "Maid of Honour",
	2: "Best Man",
	3: "Bridesmaid",
	4: "Junior Bridesmaid",
	5: "Ring Bearer",
	6: "Flower Girl",
	7: "Parent"
}*/

class Guest{
 
	// TODO: add Table number field
	constructor(eventID, fullname, email, isUnderage=0, isUnder12=0, weddingPartyPosition="Guest", invitationID="", rsvpStatus="", rsvpMeal="", id=null) {
		if(id == null){
			this.id= crypto.randomUUID();
		} else {
			this.id = id;
		}
		this.eventID = eventID;
		this.fullname = fullname; 
		this.email = email; // to send invitiation
		this.isUnderage = isUnderage;
		this.isUnder12 = isUnder12;
		this.weddingPartyPosition =  weddingPartyPosition;
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
			"weddingPartyPosition": this.weddingPartyPosition,
			"rsvpStatus": this.rsvpStatus,
			"rsvpMeal": this.rsvpMeal
		};
	}
}

module.exports = Guest;