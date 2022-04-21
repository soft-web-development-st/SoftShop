import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
// import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItemFromCart } from "../actions/cartActions";


const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const alert = useAlert();

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) {
      alert.info("Cannot Order More than Available Stock");
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) {
      alert.info("Cannot Order Less than Available Stock");
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const removeCartItemHandler = (id) => {
      dispatch(removeItemFromCart(id));
      console.log('click');
  };
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <h2 className="alert alert-danger mt-5">Your Cart Is Empty</h2>
      ) : (
        <Fragment>
          <MetaData title={"Your Cart"} />
          <h2 className="mt-5 alert alert-warning">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.product}>
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.image}
                        alt="Laptop"
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus "
                          onClick={() =>
                            decreaseQty(item.product, item.quantity)
                          }
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.quantity}
                          readOnly
                        />

                        <span
                          className="btn btn-primary plus"
                          onClick={() =>
                            increaseQty(item.product, item.quantity, item.stock)
                          }
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={() => removeCartItemHandler(item.product)}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}

              <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">3 (Units)</span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">$765.56</span>
                </p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
