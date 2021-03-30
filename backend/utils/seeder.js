const Product = require('../models/book');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const books = require('../data/books');

dotenv.config({ path: 'backend/config/confog.env' })

//connectDatabase();

const seedBooks = async () => {
    try {

        await Book.deleteMany;
        console.log('Books are deleted');

        await Book.insertMany(books)
        console.log('All Books are added.')

        process.exit();
        
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

//add to package.json in "scripts" under "prod"
//"seeder": "node backend/utils/seeder.js"

//seedProducts()