/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

class AuthModel{
 
	// TODO: add Table number field
	constructor(email, pass, token=null) {
		this.pass = pass;
		this.email = email;
		this.token = "";
	}

	toJSON(){
		return {
			"pass": this.pass,
			"email": this.email,
			"token": this.token
		};
	}
}

module.exports = AuthModel;