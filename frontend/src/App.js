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

import { loadUser } from './components/actions/userActions'
import store from './store'
import { useEffect } from "react";
import Profile from "./components/users/Profile";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";


function App() {
  
  


  useEffect(() => {
   store.dispatch(loadUser()) 
  },[])
  return (
    <>

        <Header />
      <ToastContainer/>
      <div className="App">
        <div className="container container-fluid">
      <Switch>
            <Route exact path="/" component={Home } />
            <Route exact path="/search/:keyword" component={Home } />
            <Route exact path="/product/:id" component={ProductDetails} />
            
            
            <Route exact path="/login" component={Login } />
            <Route exact path="/register" component={Register } />
            <ProtectedRoutes exact path="/me" component={Profile } />
    </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
