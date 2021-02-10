require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authToken = require('../authToken');

router.get('/', (req, res, next) => {
	res.send('hello');
	// User.find()
	//     .then(res => res.json)
	//     .then(resJson => {
	//         console.log(resJson);
	//     })
	//     .catch(next);
});

router.post('/register', async (req, res, next) => {
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		console.log(salt);
		console.log(hashedPassword);

		User.create({ ...req.body, password: hashedPassword }).then((user) => {
			res.status(201).json(user);
		})
		.catch(res.status(400).send("Incomplete registration"));
	} catch {
		res.status(500);
	}
});

router.post('/login', (req, res, next) => {
	User.find({})
		.then((users) => {
			return users.find((user) => user.email === req.body.email);
		})
		.then(async (user) => {
			if (user) {
                console.log("user found");
                console.log(req.body.password);
                console.log(user.password);
				if (await bcrypt.compare(req.body.password, user.password)) {
					// Attribution for user.toJSON() to Nipek from Stack Overflow @ https://stackoverflow.com/questions/52781477/expected-payload-to-be-a-plain-object-mean. This changes the plan text to json so it can then be used by jwt and resturned as json in a later line.
					const accessToken = jwt.sign(
						user.toJSON(),
						process.env.ACCESS_TOKEN_SECRET
					);
					res.status(200).json({ accessToken: accessToken, id: user._id });
				} else {
					res.status(401).send('Incorrect Password');
				}
			} else {
				res.status(401).send('Incorrect Username');
			}
		})
		.catch(next);
});

module.exports = router;
