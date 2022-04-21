import React, { Fragment, useState, useEffect } from "react";

import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../actions/userActions";
import MetaData from "../layouts/MetaData";

import { UPDATE_PASSWORD_RESET } from "../../constants/userContants";

const UpdatePassword = ({ history }) => {
  const [oldpassword, setOldpassword] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

 
  const { error, isUpdated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
        alert.error(error);
        console.log(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password updated succesfully");
      history.push("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldpassword", oldpassword);
    formData.set("password", password);
    //   const formData = { oldPassword, password };

    dispatch(updatePassword(formData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Update Password"} />
          <div className="row wrapper pt-5">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Update Password</h1>
                <div className="form-group">
                  <label htmlFor="old_password_field">Old Password</label>
                  <input
                    type="password"
                    id="old_password_field"
                    className="form-control"
                    onChange={(e) => setOldpassword(e.target.value)}
                    value={oldpassword}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new_password_field">New Password</label>
                  <input
                    type="password"
                    id="new_password_field"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                  disabled={loading ? true : false}
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default UpdatePassword;
