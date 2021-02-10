const mongoose = require('../db/connections');
const OrderSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,git 
		default: 'Order Submitted',
	},
	deliveryEta: {
		type: Number,
		required: true,
		default: Date.now + 259200000, // current date in millseconds + 3 days in milliseconds
	},
    orderOwner: {
        type: String,
        required: true,
    }
});