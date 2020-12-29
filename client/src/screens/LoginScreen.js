import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { login} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  
  const onSubmitHandler = (e) => {
  
    e.preventDefault();
    dispatch(login(email, password));
  };
useEffect(()=>{
if(userInfo){
  history.push(redirect)
}
},[history, userInfo, redirect])
  return (
    <FormContainer>
      {loading && <Loader />}
      <Form
        onSubmit={onSubmitHandler}
        style={{ fontSize: "15px" }}
        className="mx-3 px-3 py-5"
      >
        <Form.Group style={{ fontSize: "small" }} controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            style={{ fontSize: "small" }}
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={{ fontSize: "small" }} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            style={{ fontSize: "small" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ fontSize: "x-small" }}>
          Submit
        </Button>
        <Row className="py-3">
        <Col >
          New Customer ?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
      </Form>
     
    </FormContainer>
  );
};

export default LoginScreen;
