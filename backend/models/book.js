const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: {
        type: String,
        enum: {
            values: [
                'Romantic fiction',
                'Action fiction',
                'Dystopian fiction',
                'Fantasy fiction',
                'Horror fiction',
                'Historical fiction',
                'Children fiction',
                'Religious fiction',
                'Philosophical fiction',
                'Realistic fiction'
            ]
        }
    },
    description: String,
    cover: String,
    date: Date,
    publisher: String,
    authorDesc: String,
    price: Number,
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    topSeller: Boolean
})

module.exports = mongoose.model('Book', bookSchema);