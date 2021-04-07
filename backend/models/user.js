const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30,'Your name cannot exceed 30 characters']
    },
    nickname:{
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30,'Your name cannot exceed 30 characters']
    },
    ID: {
        type: String,
        required: [true, 'Please enter ID'],
        unique: true,
    },
    email:{
        type: String,
        required:[true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required:  [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    }, 
    creditCard: { 
        type: Object,
        number: {type: Number},
        expDate: {type: String},
        cvv: {type: Number},
    },
    shippingAddress:{  
        type: Object,
        streetAddress: {type: String},
        city: {type: String},
        zipCode: {type: String}
    },
    role:{
        type: String,
        default: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
    
})

//Encripting password before saving the user
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password,10)
})

//check password
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    }); 
}



module.exports = mongoose.model('User', userSchema);