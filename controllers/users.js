const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
	res.send('hello');
	// User.find()
	//     .then(res => res.json)
	//     .then(resJson => {
	//         console.log(resJson);
	//     })
	//     .catch(next);
});

router.post('/register', (req, res, next) => {
	const userData = req.body;
	User.create(userData)
		.then((user) => res.status(201).json(user))
		.catch(next);
});

module.exports = router;
