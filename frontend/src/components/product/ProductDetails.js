import React, {Fragment, useEffect} from 'react'

import Loader from '../layout/Loader'


import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/productActions'

const ProductDetails = ({ match }) => {

    const dispatch = useDispatch();

    const { loading, product } = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
    }, [dispatch, match.params.id])

    return (
        <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
            <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <img src={product.cover} alt="sdf" height="500" width="500"/>
                </div>
                        
                <div className="col-12 col-lg-5 mt-5">
                    <div class="lato">
                        <h3>{product.title}</h3>
                        <h6 className="mt-3">
                            <a href={product.authorsBooks}>Author: {product.author}</a> 
                        </h6>
                    </div>
                    <p id="product_id">ID: {product._id}</p>
                    
                <hr/>
                <div className="ratings mt-auto">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                    </div>
                </div>
                <span id="no_of_reviews">{product.numOfReviews} Reviews</span>
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
                <p id="product_seller mb-3">Sold by: <strong>Geek Text</strong></p>
            
                <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">Submit Your Review</button>
                
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

                                        <textarea name="review" id="review" className="form-control mt-3">

                                        </textarea>

                                        <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>         
                    </div>
                       
                    </div>
                    </div>
                    
        </Fragment>
        )}
        </Fragment>
    )
}

export default ProductDetails