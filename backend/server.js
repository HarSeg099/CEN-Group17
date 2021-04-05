const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

//handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down server due to uncaught exceptions`);
    process.exit(1)
})

//setting up config file
dotenv.config({ path: 'backend/config/config.env'})

//Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//handle unhandle promise rejections
process.on('unhandledRejection',err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down server due to Unhandled Promise rejection`);
    server.close(() => {
        process.exit(1)
    })
})