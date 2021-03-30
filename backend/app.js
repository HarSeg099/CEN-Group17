const express = require('express');
const app = express();


const errorMiddleware = require('./middlewares/errors')

app.use(express.json());

//import all routes
const books = require('./routes/book');


app.use('/api/v1', books)

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app