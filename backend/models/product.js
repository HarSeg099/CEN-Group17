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
                'Comic',
                'Crime',
                'Fantasy',
                'Horror',
                'Mystery',
                'Novel',
                'Romance',
                'Science Fiction'
            ],
            messsage: 'Please select correct category for book'
        }
    },
    description:{
        type:String,
        required: [true, 'Please enter product description']
    },
    cover:[
        {
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
     }
    ],
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);