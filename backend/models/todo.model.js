const mongoose = require('mongoose');

const  todoSchema = new mongoose.Schema({
    student_id: {
		type: String,
		required: true
	},
	task: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	done: {
		type: Boolean,
		default: false
	},
	created_at: {
		type: Number
	}
});

mongoose.model('todo', todoSchema);