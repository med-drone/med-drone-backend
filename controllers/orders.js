require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const authToken = require('../authToken');
app = express();
app.use(express.json());

const router = express.Router();
const Order = require('../models/order');

router.post('/', authToken, (req, res, next) => {
	const orderData = req.body;
	Order.create({
		...orderData,
		owner: {
			ownerId: req.user._id,
			email: req.user.email,
		},
	})
		.then((post) => res.status(201).json(post))
		.catch(next);
});

router.get('/my-orders/:userId', (req, res, next) => {
	const userId = req.params.userId;
	Order.find({ 'owner.ownerId': `${userId}` })
		.then((order) => res.json(order))
		.catch(next);
});

router.delete('/my-orders/:orderId', (req, res, next) => {
	Order.deleteOne({ _id: `${req.params.orderId}` })
		.then((order) => res.json(order))
		.catch(next);
});

module.exports = router;
