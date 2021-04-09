import React, { Fragment, useState, useEffect } from 'react'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import ListReviews from '../review/ListReviews'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, newReview, clearErrors } from '../../actions/productActions'
//import { getUserDetails } from '../../actions/userActions'
//import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import { addToCartReducer } from '../../reducers/cartReducers';

const ProductDetails = ({ match }) => {

    const [rating, setRating] = useState(0);
    const [bookCount, setBookCount] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();
    const formData = new FormData();
    

    const {loading, error, product } = useSelector(state => state.productDetails);
    const {user } = useSelector(state => state.auth);
    //const{orders} = useSelector(state => state.orderDetails);
    //const {userdetails } = useSelector(state => state.userDetails)
    const { error: reviewError, success } = useSelector(state => state.newReview);

    // const {addToCart} = useSelector(state => state.addToCart);

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }
        if (success) {
            alert.success('Review posted successfuly')
            dispatch({type: NEW_REVIEW_RESET})
        }
    }, [dispatch,error, alert, reviewError, match.params.id, success])

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }
    /*function orderDelivered(){

        var delivered = true;

        if(orders.orderStatus === "Delivered" )
        delivered = true;
        else
        delivered = false;

        return delivered;
    }*/
   
    function getIdentification(){//handling nickname choices
        var nickName = "Anonymous";    
        var value = document.getElementById('input').value;

        if(value === "nickname"){
             nickName = user.nickname;
        }
        document.getElementById('output').innerHTML= nickName;
        formData.set('nickname', nickName);
    }
     
    const reviewHandler = () => {

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);

        dispatch(newReview(formData));
    }

    /*
    CART COMPONENT
    **/
    function updateCart() {
        dispatch(addToCartReducer({book: product, count: bookCount}));
    }

     /*
    CART COMPONENT
    **/


    return (
        <Fragment>
       {loading ? <Loader /> : (
           <Fragment>
           <MetaData title={product.name}/>
                <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <img
            src= {product.cover} alt="sdf" height="500" width="500"  /> 
        </div>

        <div className="col-12 col-lg-5 mt-5">
            <h3>{product.title}</h3>
            <h6 className="mt-3">
                 <a href={product.authorsBooks}>Author: {product.author}</a> 
            </h6>
            <p id="product_id">Product # {product._id}</p>

            <hr/>

            <div className="rating-outer">
                <div className="rating-inner" style={{ width: `${(product.ratings / 5 ) * 100 }%` }}></div>
            </div>

            <hr/>

            <p id="product_price">${product.price}</p>
             <div className="stockCounter d-inline">
                
                <span className="btn btn-danger minus" onClick={() => setBookCount(bookCount > 0 ? bookCount - 1 : bookCount)}>-</span>

                <input type="number" className="form-control count d-inline" value= {bookCount} readOnly />

                <span className="btn btn-primary plus" onClick={() => setBookCount(bookCount + 1)} >+</span>
            </div>
             <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4"    
              onClick={ () => updateCart() }>Add to Cart</button>

            <hr/>

            <p>Status: <span id="stock_status">In Stock</span></p>

            <hr/>
                <div class="tabs">

                    <input name="tabs" type="radio" id="tab-1" class="input"/>
                    <label for="tab-1" class="label">About the Author</label>
                    <div class="panel">
                        <div class ="lato">
                            <h5>About the Author</h5>
                            <p>{product.authorDesc}</p>
                        </div>
                    </div>
                
                    <input name="tabs" type="radio" id="tab-2" class="input"/>
                    <label for="tab-2" class="label">Book Description</label>
                    <div class="panel">
                        <div class ="lato">
                            <h5>Book Description</h5>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    
                    <input name="tabs" type="radio" id="tab-3" class="input"/>
                    <label for="tab-3" class="label">Book Details</label>
                    <div class="panel">
                        <div class ="lato">
                            <h5>Book Details</h5>
                            <p><b>Genre:</b> <i>{product.genre}</i></p>
                            <p><b>Publisher:</b> <i>{product.publisher}</i></p>
                            <p><b>Publication Date:</b> <i>{product.date}</i></p>
                        </div>
                    </div>
                </div>
            <hr/>
            <p id="product_seller mb-3">Sold by: <strong>{product.publisher}</strong></p>
           
             { user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal"
             onClick={setUserRatings}>
                        Submit Your Review
            </button>//if user login display the botton //if user purchased the book the order status must be delivered
            :
               <div className="alert alert-dager mt-5" type='alert'> You can only comment about a book that you bought, Login to post your review. </div>
            } 
            
            
            <div className="row mt-2 mb-5">
                <div className="rating w-50">

                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    <ul className="stars" >
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                    </ul>

                                    <textarea name="review" id="review" className="form-control mt-3"
                                    value={comment}onChange={(e) => setComment(e.target.value)}>

                                    </textarea>
                                    
                                    <div className="container" >
                                    <h3> Select Identification </h3>
                                    
                                    <select id="input" onChange={()=>getIdentification()}>
                                    <option >Select: </option>
                                    <option value="nickname">Nickname </option>
                                    <option value="anonymous">Anonymous</option>
                                    </select>
                                    <div id="output">

                                    </div>
                                    </div>

                                    <button className="btn my-3 float-right review-btn px-4 text-white" 
                                    onClick= {reviewHandler}
                                    data-dismiss="modal" 
                                    aria-label="Close">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                    
             </div>

          </div>

        </div>
        {product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )}
                     
         </Fragment>
       )}
    </Fragment>
    )
}

export default ProductDetails

// export default connect(mapStateToProps, mapDispatchToProps())(BookDetails);
