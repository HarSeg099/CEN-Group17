const Book = require('../models/book')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

exports.newBook= catchAsyncErrors (async (req, res, next) => {

    const book = await Book.create(req.body);

    res.status(201).json({
        success: true,
        book
    })
})

//Get all books => /api/v1/books
exports.getBooks = catchAsyncErrors (async (req, res, next) => {

    const resPerPage = 10;
    const booksCount = await Book.countDocuments();
    
    const apiFeatures= new APIFeatures(Book.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)

    const books = await apiFeatures.query;

    res.status(200).json({
        success: true,
        booksCount,
        resPerPage,
        books
    })
})

//Get single product details = > /api/v1/book/:id

exports.getSingleBook = catchAsyncErrors (async (req, res, next) => {

    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }

    res.status(200).json({
        success: true,
        book
    })
})
