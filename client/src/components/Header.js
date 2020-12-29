import React from "react";
import {Route} from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../images/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox"
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    
  };
  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="sm"
        bg="primary"
        variant="light"
        className="py-0 my-0"
        
      >
        <Container>
          <LinkContainer to="/" style={{fontSize: '15px'}}>
            <Navbar.Brand href="/">
              <img
                alt=""
                src={logo}
                width="25"
                height="25"
                className="d-inline-block align-top img-circle"
                roundedcircle="true"
              />{" "}
           Basic Cart
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Route render={({history})=> <SearchBox history={history}/>}/>
            <Nav className="ml-auto">
              <LinkContainer style={{marginTop : "5px"}}to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown 
                  style={{ fontSize: "x-small",whiteSpace:"nowrap" }}
                  alignRight
                  
                  title={
                 <>
                      {userInfo.avatar ? (
                        <img className="avatar"
                        
                          src={`data:${"image/png"};base64,${new Buffer(
                            userInfo.avatar.data
                          ).toString("base64")}`}
                          alt=""
                        />
                      ) : (
                        <img src="" alt=""/>
                      )}
                     {userInfo.name}
                  </>
                  }
                  id="username"
                >
                  {userInfo.isAdmin ? (<>
                    <LinkContainer
                    className="btn-light"
                    style={{ fontSize: "x-small" }}
                    to="/profile"
                  >
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer
                    className="btn-light"
                    style={{ fontSize: "x-small" }}
                    to="/admin/users"
                  >
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer
                    className="btn-light"
                    style={{ fontSize: "x-small" }}
                    to="/admin/products"
                  >
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer
                    className="btn-light"
                    style={{ fontSize: "x-small" }}
                    to="/admin/orders"
                  >
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    style={{ fontSize: "x-small" }}
                    className="btn-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavDropdown.Item>
                  </>) : (
                    <>
                    <LinkContainer
                    className="btn-light"
                    style={{ fontSize: "x-small" }}
                    to="/profile"
                  >
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    style={{ fontSize: "x-small" }}
                    className="btn-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavDropdown.Item>
                    </>
                  )}
                 
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer  style={{marginTop : "5px"}} to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i>
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer   style={{marginTop : "5px"}} to="/register">
                    <Nav.Link>
                      <i className="fas fa-user"></i>
                      Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
