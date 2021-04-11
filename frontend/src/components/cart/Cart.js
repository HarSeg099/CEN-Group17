import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { addToCartReducer, changeBookCountReducer, deleteBookReducer } from '../../reducers/cartReducers';
import { addToWishListReducer, deleteFromWishListReducer } from '../../reducers/wishReducers';

class Cart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            targetID: null,
            bookObject: {},
            qtyCount: 0,
            bookCount: 0
        }

    }


    priceTotal() {
        let subTotal = 0;
        for (let i = 0; i < this.props.cart.cart.length; i++) {
            let totalPrice = 0;
            totalPrice = this.props.cart.cart[i].book.price * this.props.cart.cart[i].count;
            subTotal += totalPrice;
            console.log(this.props.cart.cart[i].book.price);
        }

        return subTotal
    }

    negativeQuantity(book, count) {
        if(count > 0){
            this.props.changeBookCountReducer({book: book, count: count - 1});
        }
    }

    deleteBook(book){
        this.props.deleteBookReducer(book);
    }

    addToWishList(book, count){
        this.props.addToWishListReducer({book, count});
        this.props.deleteBookReducer(book);
    }

    moveToCart(book, count){
        this.props.addToCartReducer({book, count})
        this.props.deleteFromWishListReducer(book);
    }

    render() {
            console.log(this.props.cart)
        return (
            <Fragment>
                <h2 className="mt-5">Your Cart: <b>{this.props.cart.length}</b></h2>
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">

                        {this.props.cart.cart && this.props.cart.cart.map(books => (
                            <Fragment>
                                <hr />

                                <div key={books} className="col-sm-12 col-md-6 col-lg-3 my-3">
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={books.book.cover} alt={books.book.title} height="90" width="100" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${books.book._id}`}>{books.book.title}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${books.book.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                
                                                <input type="number" className="form-control count d-inline" value={books.count} readOnly />    
                                                    <span className="btn btn-primary plus"onClick={() => this.props.changeBookCountReducer({book: books.book, count: books.count + 1})}>+</span>
                                                    <span className="btn btn-danger minus"onClick={() => this.negativeQuantity(books.book, books.count)}>-</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item"onClick={() => this.deleteBook(books.book)}className="fa fa-trash btn btn-danger"></i>
                                            </div>
                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="move_to_wishlist_cart_item"onClick={() => this.addToWishList(books.book, books.count)}className="fa fa-car btn btn-info"></i>
                                            </div>
                                    
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${this.priceTotal().toFixed(2)}</span></p>
                        <p>Est. total: <span className="order-summary-values">${((this.priceTotal() * 0.07) + (this.priceTotal())).toFixed(2)}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block">Check out</button>
                    </div>
                </div>



                <br/><br/><br/>
                <h2 className="mt-5">Your Wish List: <b>{this.props.wishList.length}</b></h2>
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">

                        {this.props.wishList.cart && this.props.wishList.cart.map(books => (
                            <Fragment>
                                <hr />

                                <div key={books} className="col-sm-12 col-md-6 col-lg-3 my-3">
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={books.book.cover} alt="Laptop" height="90" width="100" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/book/${books.book._id}`}>{books.book.title}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${books.book.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                
                                                <input type="number" className="form-control count d-inline" value={books.count} readOnly />    
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item"onClick={() => this.moveToCart(books.book, books.count)}className="fa fa-car btn btn-danger"></i>
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </Fragment >
        )
    }

}


const mapStateToProps = (state) => ({
    books: state.books,
    cart: state.cart,
    wishList: state.wishList
});

const mapDispatchToProps = () => {
    return {
        addToCartReducer, changeBookCountReducer, deleteBookReducer, addToWishListReducer, deleteFromWishListReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Cart);