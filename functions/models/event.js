/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";
const IteneraryItem = require("./iteneraryItem");
const crypto = require("crypto");
//const assert = require("assert");

class Event{
	constructor(title, date, descr, mealOptions=[], itenerary=[], id=null) {
		if (id == null) {
			this.id= crypto.randomUUID();
		} else {
			this.id = id;
		}
		
		this.title = title; 
		this.date = date;
		this.descr = descr;

		if(mealOptions){
			//assert(typeof mealOptions == Array, "Event 'mealOptions' should be an array of strings, received: "+mealOptions);
			this.mealOptions = mealOptions
		} else {
			this.mealOptions = [];
		}

		const iten = [];
		if(Array.isArray(itenerary)){
			itenerary.forEach(i => {
				if(i instanceof IteneraryItem){
					iten.push(i);
				} else {
					iten.push(new IteneraryItem(i));
				}
			});
		}
		this.itenerary = iten;
	}

	toJSON(){
		let iteneraryJson = [];
		for (let i in this.itenerary){
			iteneraryJson.push(i.toJSON());
		}
		return {
			"id": this.id,
			"title": this.title,
			"date": this.date,
			"itenerary": iteneraryJson,
			"mealOptions": this.mealOptions,
		};
	}
}

module.exports = Event;