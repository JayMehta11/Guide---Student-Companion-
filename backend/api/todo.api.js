// Todo Schema
// student_id: {
// 	type: String,
// 	required: true
// },
// task: {
// 	type: String,
// 	required: true
// },
// done: {
// 	type: Boolean,
// 	default: false,
// 	required: true
// },
// description: {
// 	type: String
// },
// created_at: {
// 	type: Date,
// 	default: Date.now
// }

const jwt = require('jsonwebtoken');
const app = require('express').Router();
const mongoose = require('mongoose');
const Todo = mongoose.model('todo');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

let mailOptions = {
	from: '',
	to: '<TO_EMAIL_ADDRESS>',
	subject: 'Email from Node-App: A Test Message!',
	text: 'Some content to send'
};

// e-mail transport configuration


app.post('/reminder',(req,res) => {
	cron.schedule(req.body.schedule,() => {
		let transporter = nodemailer.createTransport({
			service: "gmail",
			secure: false,
			auth: {
				user: process.env.gmailId,
				pass: process.env.gmailPass
			}
		});
		transporter.sendMail({
			from: 'guide.studentcompanion@gmail.com',
			to: req.body.emailId,
			subject: "REMINDER FOR THE INCOMPLETE TASK",
			text: `This mail is sent to inform you that your task ${req.body.task} is still pending! Please complete it`
		})
	})
	res.json({
		status: true,
		message: "Reminder set"
	})

	
})

app.post('/add', (req, res) => {
	var decoded = jwt.verify(req.headers.authorization, process.env.secret);
	let createdat = parseInt(new Date().getTime() / 1000)
	const todo = new Todo({
		student_id: decoded.id,
		task: req.body.task,
		description: req.body.description,
		done: false,
		created_at: createdat
	});
	todo.save((err, todo) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Todo Added Successfully'
			});
		}
	});
});

app.post('/update', (req, res) => {
	Todo.findOneAndUpdate({
		_id: req.body._id
	}, {
		$set: {
			task: req.body.task,
			description: req.body.description,
			done: req.body.done
		}
	}, (err, todo) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Todo Updated Successfully'
			});
		}
	});
});

// Delete Todo POST API

app.post('/delete', (req, res) => {
	Todo.findOneAndRemove({
		_id: req.body._id
	}, (err, todo) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Todo Deleted Successfully'
			});
		}
	});
});

// Get All Todo POST API of a student
// Fetch student Id from Token


app.post('/get', (req, res) => {
	const decoded = jwt.verify(req.headers.authorization, process.env.secret);
	let query = {
		student_id: decoded.id
	}
	if(req.body.filter !== "All"){
		query['done'] = req.body.filter;
	}
	Todo.find(query, (err, todos) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Todos Fetched Successfully',
				todos
			});
		}
	});
});

module.exports = app;