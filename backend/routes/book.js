const express = require('express')
const router = express.Router();


const { getBooks, newBook, getSingleBook } = require('../controllers/productController')


router.route('/books').get(getBooks);
router.route('/book/:id').get(getSingleBook);

router.route('/book/new').post(newBook);


module.exports = router;