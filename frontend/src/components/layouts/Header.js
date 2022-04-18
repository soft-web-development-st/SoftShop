import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./Search";
import { Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { logout } from "../actions/userActions";
import { toast } from "react-toastify";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    toast.error("Logout Successfully");
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
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav>
              <Route render={({ history }) => <Search history={history} />} />
            </Nav>
            <Nav>
              {user ? (
                <NavDropdown
                  style={{ textTransform: "capitalize" }}
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
                  <Nav.Link eventKey={2} href="">
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "gray" }}
                    >
                      Login
                    </Link>
                  </Nav.Link>
                  <Nav.Link eventKey={2} href="">
                    <Link
                      to="/register"
                      style={{ textDecoration: "none", color: "gray" }}
                    >
                      Register
                    </Link>
                  </Nav.Link>
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
