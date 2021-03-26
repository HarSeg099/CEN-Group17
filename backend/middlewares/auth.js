const User = require('../models/user')
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');



//check if the user exists
exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next ) => {

    const { token } = req.cookies

    if(!token){
        return next(new ErrorHandler('Login first to access this resource.', 401))

    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()

})
