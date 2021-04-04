const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')


const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(fileUpload());

//import all the routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',order)

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app