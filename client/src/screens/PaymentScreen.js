import React, { useState} from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {savePaymentMethod} from "../actions/cartActions";

const PaymentScreen = ({history}) => {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const cart = useSelector((state)=> state.cart);
    const {shippingAddress} = cart
    if(!shippingAddress){
        history.push("/shipping")
    }
    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder")
    }
    return (
        <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h3>Payment Method</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
        
        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
           <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ fontSize: "x-small" }}>
          Continue
        </Button>
      </Form>
    </FormContainer>
    )
}

export default PaymentScreen