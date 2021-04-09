const express = require('express');
const router = express.Router();


const { getProducts, 
       newProduct, 
       getSingleProduct,
       updateProduct, 
       deleteProduct,
       createBookReview,
       getBookReviews,
       deleteReview 
} = require('../controllers/productController')

const { isAuthenticatedUser } = require('../middlewares/auth');
    

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedUser,newProduct);
router.route('/admin/product/:id')
            .put(updateProduct)
            .delete(isAuthenticatedUser, deleteProduct);

router.route('/review').put(isAuthenticatedUser, createBookReview)
router.route('/reviews').get(isAuthenticatedUser, getBookReviews)  
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)            

module.exports = router;
