/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

class Event{
	constructor(id, title, date, guests, descr, time) {
		this.id= id;
		this.title= title; 
		this.date= date; 
		this.guests= guests;
		this.descr= descr;
		this.time= time;
	}
}

module.exports = Event;