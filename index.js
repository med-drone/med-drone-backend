const express = require('express');

const app = express();


const Todo = require('./models/user');


const port = process.env.PORT || 4000;


app.listen(port, () => {
	console.log(`Running on ${port}`);
});
