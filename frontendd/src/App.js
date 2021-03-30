import {useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import {loadUser} from './actions/userActions'
import store from './store'


function App() {

  useEffect(()=> { 
    store.dispatch(loadUser())
  }, [])
  return (
    <Router>
    <div className="App">
      <Header />
      <div className="container container-fluid">
      <Route path = "/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/me" component={Profile} exact />
      <Route path="/me/update" component={UpdateProfile} exact />
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
