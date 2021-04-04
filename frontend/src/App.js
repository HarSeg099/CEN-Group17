import { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'

import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'

import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'

import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import store from './store'

function App() {

  useEffect(() => {
    store.dispatch(loadUser())

  }, [])

  return (
    <Router>
      <div className="App">
        <Header/>
        <div className ="container container-fluid ">
          <Route path = "/" component = {Home} exact />
          <Route path = "/product/:id" component = {ProductDetails} exact />

          <Route path = "/login" component = {Login}  />
          <Route path = "/register" component = {Register}  />
          <ProtectedRoute path = "/me" component = {Profile} exact />
          <ProtectedRoute path = "/orders/me" component = {ListOrders} exact />
          <ProtectedRoute path = "/orders/:id" component = {OrderDetails} exact />
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
