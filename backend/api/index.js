const express = require('express');
const app = express.Router();

app.use('/auth',require('./auth.api'));
app.use('/todo',require('./todo.api'));
app.use('/course',require('./course.api'));

module.exports = app