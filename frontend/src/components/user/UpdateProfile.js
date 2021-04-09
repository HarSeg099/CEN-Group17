import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const UpdateProfile = ({ history }) => {
    
    const [name, setName] = useState('')
    const [nickName, setNickName] = useState('')
    const [ID, setID] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [expDate, setExpdate] = useState('')
    const [cvv, setCvv] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user)
    useEffect(() => {
        setName(user.name);
        setNickName(user.nickName);
        setID(user.ID);
        setEmail(user.email);
        if (user && user.creditCard != undefined && user.shippingAddress != undefined) {
            setNumber(user.creditCard.number);
            setExpdate(user.creditCard.expDate);
            setCvv(user.creditCard.cvv);
            setStreetAddress(user.shippingAddress.streetAddress)
            setCity(user.shippingAddress.city)
            setZipCode(user.shippingAddress.zipCode)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('User updated successfully')
            dispatch(loadUser());

            history.push('/me')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated])
    
    const submitHandler = (e) => {
        e.preventDefault();

        let creditCard = { 
            'number': number,
            'expDate': expDate,
            'cvv': cvv
        }

        let shippingAddress = {
            'streetAddress': streetAddress,
            'city': city,
            'zipCode': zipCode
        }

        dispatch(updateProfile(name, nickName, ID, email, creditCard, shippingAddress))
    }

    return (
        <Fragment>
            <MetaData title={'Update Profile'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nickName_field">Nickname</label>
                            <input
                                type="nickName"
                                id="nickName_field"
                                className="form-control"
                                name='nickName'
                                value={nickName}
                                onChange={(e) => setNickName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ID_field">ID</label>
                            <input
                                type="ID"
                                id="ID_field"
                                className="form-control"
                                name='ID'
                                value={ID}
                                onChange={(e) => setID(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Email_field">Email</label>
                            <input
                                type="Email"
                                id="Email_field"
                                className="form-control"
                                name='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group"> 
                            <label htmlFor="CreditNumber_field">CreditCard Number</label>
                            <input
                                type="CreditNumber"
                                id="CreditNumber_field"
                                className="form-control"
                                name='CreditNumber'
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                            </div>
                            <div className="form-group"> 
                            <label htmlFor="CreditDate_field">Expiration Date</label>
                            <input
                                type="CreditDate"
                                id="CreditDate_field"
                                className="form-control"
                                name='CreditDate'
                                value={expDate}
                                onChange={(e) => setExpdate(e.target.value)}
                            />

                            
                            <div className="form-group"> 
                            <label htmlFor="Creditcvv_field">CVV</label>
                            <input
                                type="Creditcvv"
                                id="Creditcvv_field"
                                className="form-control"
                                name='Creditcvv'
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                            </div>

                            <div className="form-group"> 
                            <label htmlFor="StreetAddress_field">Street Address</label>
                            <input
                                type="StreetAddress"
                                id="StreetAddress_field"
                                className="form-control"
                                name='StreetAddress'
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                            />
                            </div>
                            <div className="form-group"> 
                            <label htmlFor="City_field">City</label>
                            <input
                                type="City"
                                id="City_field"
                                className="form-control"
                                name='City'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            </div>
                            <div className="form-group"> 
                            <label htmlFor="ZipCode_field">Zip Code</label>
                            <input
                                type="ZipCode"
                                id="ZipCode_field"
                                className="form-control"
                                name='ZipCode'
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                            </div>

                            </div>
                            
                            

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProfile
