import React, { Fragment, useState, useEffect } from "react";

import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../actions/userActions";
import MetaData from "../layouts/MetaData";
import { toast } from "react-toastify";



const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    
   const {error,message,loading} = useSelector(state => state.forgotPassword)
    const alert = useAlert();
    const dispatch = useDispatch();


    useEffect(() => {
      if (error) {
        alert.error(error);
        console.log(error);
        dispatch(clearErrors());
      }

      if (message) {
        toast.success(message);
      
      }
    }, [dispatch, alert, error , message]);

    const submitHandler = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.set("email", email);
     


      dispatch(forgotPassword(formData));
    };



    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={"Forgot Password"} />
            <div className="row wrapper">
              <div className="col-10 col-lg-5 pt-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                  <h1 className="mb-3">Forgot Password</h1>
                  <div className="form-group">
                    <label for="email_field">Enter Email</label>
                    <input
                      type="email"
                      id="email_field"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button
                    id="forgot_password_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={loading ? true : false}
                  >
                    Send Email
                  </button>
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </>
    );
};

export default ForgotPassword;
