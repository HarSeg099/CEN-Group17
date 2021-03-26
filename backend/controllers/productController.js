const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const APIFeatures = require('../utils/apiFeatures')

//Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

//Get all products => /api/v1/products?ketword=apple(search)
//}/api/v1/products?keyword=collins&genre=Action fiction(filter)
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query;

   
        res.status(200).json({
            success: true,
            productsCount,
            resPerPage,
            filteredProductsCount,
            products
        })
   
    

})

//Get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req,res,next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

//Update Product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found',404));
        
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false

    });

    res.status(200).json({
        success: true,
        product
    })
})

//Delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})

//Create new review => /api/v1/review
exports.createBookReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId, nickname } = req.body;

    const review = {
        user: req.user._id,
        nickname: nickname,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
   

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})



//Get book reviews => /api/v1/reviews
exports.getBookReviews = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })

})

//Delete book reviews => /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
    
    const numOfReviews = reviews.length;
    
    const ratings = product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.reviews.length
    
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    
    res.status(200).json({
        success: true
    })

})