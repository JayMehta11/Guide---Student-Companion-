const mongoose = require('mongoose');

// Course Enrollment Schema
// Need to enroll students for courses
// Should be able to enroll for multiple courses
// Should contain semesters and year information

const  courseEnrollmentSchema = new mongoose.Schema({
	student: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
	semester: { type: String },
	year: { type: Number },
	created: { type: Date, default: Date.now }
});

mongoose.model('courseEnrollment', courseEnrollmentSchema);