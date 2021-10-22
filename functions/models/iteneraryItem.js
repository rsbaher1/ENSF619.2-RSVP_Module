/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

class IteneraryItem{
	// TODO: add Table number field
	constructor(title, start, end, addr="") {
		this.title = title; 
		this.start = start; // to send invitiation
		this.end = end;
		this.addr = addr;
	}

	toJSON(){
		return {
			"title": this.title,
			"start": this.start,
			"end": this.end,
			"addr": this.addr
		};
	}
}

module.exports = IteneraryItem;