const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100,'Product name cannot exceed 100 characters']
    },
    
    author:{
        type:String,
        required: [true, 'Please enter product author'],
        trim: true,
        maxLength: [100,'Product author cannot exceed 100 characters']
    },
    authorsBooks:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5,'Product price cannot exceed 5 characters'],
        default: 0.0
    },
    genre: {
        type: String,
        required: [true, 'Please select genre for this product'],
        enum: {
            values: [
                'Action fiction',
                'Adventure',
                'Classics',
                'Children fiction',
                'Crime',
                'Dystopian fiction',
                'Fantasy fiction',
                'Historical fiction',
                'Horror fiction',
                'Mystery',
                'Novel',
                'Philosophical fiction',
                'Realistic fiction',
                'Religious fiction',
                'Romantic fiction',
                'Science Fiction'
            ],
            messsage: 'Please select correct category for book'
        }
    },
    description:{
        type:String,
        required: [true, 'Please enter product description']
    },
    cover:{
            type: String,
            required: true
    },
    publisher:{
        type:String,
        required: [true, 'Please enter product author'],
        trim: true,
        maxLength: [100,'Product author cannot exceed 100 characters']
    },
    authorDesc:{
        type:String,
        required: [true, 'Please enter published information.']
    },
    ratings:{
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            nickname: {
                type: String,
                required: true,
                default: "Anonymous"
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
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);