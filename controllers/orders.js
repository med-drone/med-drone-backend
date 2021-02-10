require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const authToken = require('../authToken');
app = express();
app.use(express.json());

const router = express.Router();
const Order = require('../models/order');

router.post('/', authToken, (req, res, next) => {
    console.log('hit');
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


module.exports = router;
