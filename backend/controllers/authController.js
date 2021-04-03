const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    
    const { name, ID, email, password } = req.body;

    const user = await User.create({
        name,
        ID,
        email,
        password
    })
    sendToken(user, 200, res)
})

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { ID, password } = req.body;

    if (!ID || !password) {
        return next(new ErrorHandler('Please enter ID & password', 400))
    }
    const user = await User.findOne({ ID }).select('+password')
    if (!user) {
        return next(new ErrorHandler('Invalid ID or Password', 401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid ID or Password', 401));
    }

    sendToken(user, 200, res)

})

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        nickName: req.body.nickName,
        ID: req.body.ID,
        email: req.body.email,
        creditCard: req.body.creditCard,
        shippingAddress: req.body.shippingAddress
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})