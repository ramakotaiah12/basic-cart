import React, { useState, } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch,  } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, suburb, postCode, country }));
    history.push("/payment");
  };
  return (
    <FormContainer style={{ fontSize: "x-small", margin: "0px" }}>
      <CheckoutSteps step1 step2 />
      <h3>Shipping</h3>
      <Form style={{ fontSize: "small", padding: "0px" }} onSubmit={submitHandler}>
        <Form.Group  controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="suburb">
          <Form.Label>Suburb</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter suburb"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postCode">
          <Form.Label>Post code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter postCode"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ fontSize: "x-small" }}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
