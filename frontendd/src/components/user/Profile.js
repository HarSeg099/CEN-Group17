import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'


const Profile = () => {
    const{user, loading} =  useSelector(state => state.auth)
    var number, expDate, cvv, streetAddress, city, zipCode
    if (loading == false && user.creditCard != undefined && user.shippingAddress != undefined){  
        number = user.creditCard.number
        expDate = user.creditCard.expDate
        cvv = user.creditCard.cvv
        streetAddress = user.shippingAddress.streetAddress
        city = user.shippingAddress.city
        zipCode = user.shippingAddress.zipCode
    }
    let creditcard = { 
        'number': number,
        'expDate': expDate,
        'cvv': cvv
    }
    let shippingaddress = {
        'streetAddress': streetAddress,
        'city': city,
        'zipCode': zipCode
    }

    

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Your Profile'} />

                    <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Nickname</h4>
                            <p>{user.nickName}</p>

                            <h4>ID</h4>
                            <p>{user.ID}</p>

                            <h4>Email</h4>
                            <p>{user.email}</p> 

                            <h4>CreditCard Number</h4>
                            <p>{creditcard.number}</p> 

                            <h4>Expiration Date</h4>
                            <p>{creditcard.expDate}</p>

                            <h4>CVV</h4>
                            <p>{creditcard.cvv}</p>  
                            
                            <h4>Street Address</h4>
                            <p>{shippingaddress.streetAddress}</p>

                            <h4>City</h4>
                            <p>{shippingaddress.city}</p>

                            <h4>Zip Code</h4>
                            <p>{shippingaddress.zipCode}</p>  

                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                    My Orders
                                </Link>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
