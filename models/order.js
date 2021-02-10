const mongoose = require('../db/connections');
const OrderSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: 'Order Submitted',
	},
	deliveryEta: {
		type: Number,
		required: true,
		default: Date.now() + 259200000, // current date in millseconds + 3 days in milliseconds
	},
	owner: {
		ownerId: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
	},
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;