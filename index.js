const { response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userControllers = require('./controllers/users')
app.use('/users', userControllers)

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Running on ${port}`);
});


