import { Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/home/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
 import { ToastContainer} from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import ProductDetails from './components/product/ProductDetails'
import Login from "./components/users/Login";
import Register from "./components/users/Register";

import {  loadUser } from './components/actions/userActions'
import store from './store'
import { useEffect } from "react";
import Profile from "./components/users/Profile";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import UpdateProfile from "./components/users/UpdateProfile";
import UpdatePassword from "./components/users/UpdatePassword";
import ForgotPassword from "./components/users/ForgotPassword";
import NewPassoword from "./components/users/NewPassoword";
import Cart from "./components/cart/Cart";


function App() {
  
  useEffect(() => {
   store.dispatch(loadUser()) 
  },[])
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="App">
        <div className="container container-fluid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search/:keyword" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />

            <Route exact path="/cart" component={Cart} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/password/forgot" component={ForgotPassword} />
            <Route
              exact
              path="/password/reset/:token"
              component={NewPassoword}
            />
            <ProtectedRoutes exact path="/me" component={Profile} />
            <ProtectedRoutes
              exact
              path="/me/update"
              component={UpdateProfile}
            />
            <ProtectedRoutes
              exact
              path="/password/update"
              component={UpdatePassword}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
