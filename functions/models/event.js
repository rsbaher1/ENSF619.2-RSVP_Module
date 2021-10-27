/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";
const IteneraryItem = require("./iteneraryItem");
const crypto = require("crypto");
const assert = require("assert");

class Event{
	constructor(title, date, descr, mealOptions=[], itenerary=[]) {
		this.id= crypto.randomUUID();
		this.title = title; 
		this.date = date;
		this.descr = descr;

		if(mealOptions){
			assert(typeof mealOptions === Array, "Event 'mealOptions' should be an array of strings, received: "+mealOptions);
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
		return {
			"id": this.id,
			"title": this.title,
			"date": this.date,
			"itenerary": this.itenerary.toJSON(),
			"mealOptions": this.mealOptions,
		};
	}
}

module.exports = Event;