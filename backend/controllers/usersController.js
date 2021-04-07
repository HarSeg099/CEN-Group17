const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');

const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

//Register a user => /api/v1/register
exports.registerUser = catchAsyncError( async (req, res, next) => {
    const { name, nickname, ID, email, password } = req.body;

    const user = await User.create({
        name,
        nickname,
        ID,
        email,
        password
    })

   sendToken(user, 200, res)
})

//login user => /a/i/v1/login
exports.loginUser = catchAsyncError( async(req, res, next ) => {
    const { ID, password } = req.body;

    //checks if email and password are good
    if(!ID || !password){
        return next(new ErrorHandler('Please enter ID and password',400))
    }

    //Findinf user in database
    const user = await User.findOne({ ID }).select('+password')

    if(!user) {
        return next(new ErrorHandler('Invalid ID ',401));
    }

    //check if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid  password',401));
    }

    sendToken(user, 200, res)

})

// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

/*exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        nickname: req.body.nickname,
        ID: req.body.ID,
        email: req.body.email,
        //creditCard: req.body.creditCard,
       // shippingAddress: req.body.shippingAddress
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})*/

// Logout user   =>   /api/v1/logout
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })

})

// Get user details   =>   /api/v1/user/:id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

