const mongoose = require('../db/connections');

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		location: {
			type: String,
			required: false,
		},
		doctorsNumber: {
			type: String,
			required: false,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const User = mongoose.model('User', UserSchema);
module.exports = User;
