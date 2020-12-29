import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
 const formData = new FormData();
 formData.append('name', name);
 formData.append('email', email);
 formData.append('password', password);
 formData.append('avatar', avatar);
    dispatch(register(formData));
  };

  return (
    <FormContainer style={{ margin: "0px" }}>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form
        onSubmit={onSubmitHandler}
        style={{ fontSize: "15px" }}
        className="mx-3 px-3 py-5"
      >
        <Form.Group
          style={{ fontSize: "small", padding: "0px" }}
          controlId="name"
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            style={{ fontSize: "small" }}
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          style={{ fontSize: "small", padding: "0px" }}
          controlId="email"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            style={{ fontSize: "small" }}
            type="email"
            placeholder="Enter email"
            value={email}
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
        <Form.Group style={{ fontSize: "small" }} controlId="avatar">
          <Form.Label>Profile picture</Form.Label>
          <input
            type="file"
            id="file"
            name="avatar"
            style={{ fontSize: "small" }}
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ fontSize: "x-small" }}>
          Submit
        </Button>
        <Row className="py-3">
          <Col>
            Already have an account ?
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
