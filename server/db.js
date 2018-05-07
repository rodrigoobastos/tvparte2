var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tvparte2');
var userSchema = new mongoose.Schema({
	email: String,
	first_name: String,
	last_name: String,
	personal_phone: String,
	password: String
}, { collection: 'users' }
);
module.exports = { Mongoose: mongoose, UserSchema: userSchema };