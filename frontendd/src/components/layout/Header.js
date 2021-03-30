import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'

import{ useDispatch, useSelector} from 'react-redux'
import {logout} from '../../actions/userActions'

import '../../App.css'
const Header = () => {
    const dispatch = useDispatch();

    const{user, loading} = useSelector(state => state.auth)

    const logoutHandler = () => {
      dispatch(logout());
  }
    return (
        <Fragment>
            <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <img src="./images/logo.png" />
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Book Name ..."
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to = "/cart" style={{textDecoration: 'none'}}>
      <span id="cart" className="ml-3">Cart </span>
      </Link>
        {user ? (  
            <div className="ml-4 dropdown d-inline">
            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                <span>{user && user.name}</span>
            </Link>
            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

            <Link className="dropdown-item" to="/me">Profile</Link>
            <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Logout
                                </Link>


              </div>
            </div>
        ): !loading && <Link to= "/login" clasName="btn m1-4" id="login_btn">Login</Link>}
        

      </div>
    </nav>
        </Fragment>
    )
}

export default Header
