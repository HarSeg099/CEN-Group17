import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'

import Search from './Search'

import '../../App.css'

const Header = () => {
    return (
        <Fragment>
            <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/images/book_logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} /> }  />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <button className="btn" id="login_btn">Login</button>

        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">0</span>
      </div>
    </nav>
        </Fragment>
    )
}

export default Header