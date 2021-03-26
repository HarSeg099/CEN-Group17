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

const ProductDetails = ({ match }) => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [nickname, setNickname] = useState('Anonymous');

    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading, error, product } = useSelector(state => state.productDetails);
    const {user } = useSelector(state => state.auth)
    //const {userdetails } = useSelector(state => state.userDetails)
    const { error: reviewError, success } = useSelector(state => state.newReview)

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
     
    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('nickname', nickname);
        formData.set('productId', match.params.id);

        dispatch(newReview(formData));
    }


    return (
        <Fragment>
       {loading ? <Loader /> : (
           <Fragment>
                <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <img
            src= {product.cover} alt="sdf" height="300" width="300"  /> 
        </div>

        <div className="col-12 col-lg-5 mt-5">
            <h3>{product.title}</h3>
            <p id="product_id">Product # {product._id}</p>

            <hr/>

            <div className="rating-outer">
                <div className="rating-inner" style={{ width: `${(product.ratings / 5 ) * 100 }%` }}></div>
            </div>
            <span id="no_of_reviews">({product.numOfRiviews} Reviews)</span>

            <hr/>

            <p id="product_price">${product.price}</p>
            <div className="stockCounter d-inline">
                <span className="btn btn-danger minus">-</span>

                <input type="number" className="form-control count d-inline" value="1" readOnly />

                <span className="btn btn-primary plus">+</span>
            </div>
             <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

            <hr/>

            <p>Status: <span id="stock_status">In Stock</span></p>

            <hr/>

            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr/>
            <p id="product_seller mb-3">Sold by: <strong>{product.publisher}</strong></p>
           
             { user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal"
             onClick={setUserRatings}>
                        Submit Your Review
            </button>//if user login display the botton
            :
               <div className="alert alert-dager mt-5" type='alert'> Login to post your review. </div>
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
                                    

                                    <select>
                                    <option value="Select your identification">Select your identification: </option>
                                    <option value={nickname}onChange={(e) => setNickname(product.nickname)}>Use nickname</option>
                                    <option value="anonymous">Remain anonymous</option>
                                    </select>

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
