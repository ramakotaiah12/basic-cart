import React, { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Card,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
const CartScreen = ({ match, history, location }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
   
    <Row style={{marginRight : "90px", marginLeft: "90px"}}>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <h3>
            Your cart is empty{" "}
            <Link
              className="btn btn-primary my-3"
              style={{ fontSize: "x-small", size: "sm" }}
              to="/"
            >
              Go Back
            </Link>
          </h3>
        ) : (
          <ListGroup variant="flush">
            <h4>Shopping Cart</h4>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`data:${"image/png"};base64,${new Buffer(
                        item.image.data
                      ).toString("base64")}`}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price.toFixed(2)}</Col>
                  <Col md={3}>
                    <Form.Control
                      style={{ fontSize: "x-small" }}
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      style={{
                        margin: "1px",
                        backgroundColor: "#e50000",
                        borderColor: "#e50000",
                      }}
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i variant="light" className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card style={{marginTop : "10px"}}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>
                SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                )ITEMS
              </h5>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            {cartItems.length !== 0 ? (
              <Button
                style={{ fontSize: "small" }}
                type="button"
                className="btn-block"
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            ) : (
              <Button
                style={{ fontSize: "small" }}
                type="button"
                className="btn-block"
                disabled
              >
                Proceed To Checkout
              </Button>
            )}
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    
    </Row>
  );
};

export default CartScreen;
