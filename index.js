const { response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userController = require('./controllers/users');
app.use('/users', userController);

const orderController = require('./controllers/orders');
app.use('/orders', orderController)

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Running on ${port}`);
});
