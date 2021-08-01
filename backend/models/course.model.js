const mongoose = require('mongoose');

// Course Schema
// course name - String,
// course code - String,
// credits - Number,
// prerequistes - Array,
// course discription - String,
// faculty - String,
// category ids - Array,
// schedule - Array,
// ratings(array) - Array,

const  courseSchema = new mongoose.Schema({
	courseName: {type: String, required: true},
	courseCode: {type: String, required: true},
	credits: {type: Number, required: true},
	prerequisites: [{type: String, required: true}],
	courseDescription: {type: String, required: true},
	faculty: {type: String, required: true},
	categoryIds: [{type: String}],
	ratings: [
		{
			rating: {type: Number, required: true},
			comment: {type: String}
		}
	],
	schedule: [
		{
			day: {type: Number,required: true},
			time: {type: String, required: true}
		}
	],
	school: {
		type: String,
		required: true
	}
	
});

mongoose.model('course', courseSchema);