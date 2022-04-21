import React from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./Search";
import { Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from "react-alert";

import { logout } from "../actions/userActions";
// import { toast } from "react-toastify";
import { useAlert } from "react-alert";

const Header = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
   const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.error("Logout Successfully");
    history.push("/login");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Container>
          <Navbar.Brand>
            <Link style={{ textDecoration: "none", color: "gray" }} to="/">
              SoftShop
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>

              <Link
                style={{ textDecoration: "none", color: "gray" }}
                className="mt-2"
                to="/cart"
              >
                Cart
                <Badge style={{marginLeft:'5px'}} bg="secondary">{cartItems.length}</Badge>
              </Link>
            </Nav>

            <Nav className="me-auto">
              <Route render={({ history }) => <Search history={history} />} />
            </Nav>

            <Nav>
              {user ? (
                <NavDropdown
                  style={{ textTransform: "capitalize", marginLeft: ".5rem" }}
                  title={user.name}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item>
                    {user && user.role !== "admin" ? (
                      <Link
                        style={{ textDecoration: "none", color: "gray" }}
                        to="/orders/me"
                      >
                        Orders
                      </Link>
                    ) : (
                      <Link
                        style={{ textDecoration: "none", color: "gray" }}
                        to="/darshboard"
                      >
                        Darshboard
                      </Link>
                    )}
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link
                      style={{ textDecoration: "none", color: "gray" }}
                      to="/me"
                    >
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link
                      style={{ textDecoration: "none", color: "red" }}
                      to="/logout"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "gray",
                      marginRight: "1rem",
                      marginLeft: ".5rem",
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    style={{ textDecoration: "none", color: "gray" }}
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
