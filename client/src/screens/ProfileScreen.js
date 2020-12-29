import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Table, } from "react-bootstrap";
import {LinkContainer } from "react-router-bootstrap"
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../types/userTypes";
import {listMyOrders} from "../actions/orderActions";
const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading : loadingOrders, error : errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders())
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);
    formData.append('_id', user._id)

    dispatch(
      updateUserProfile(formData)
    );
  };
  return (
    <Row>
      <Col md={3}>
        {success && <Message variant="primary">Profile Updated</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form
          onSubmit={onSubmitHandler}
          style={{ fontSize: "15px" }}
          className="mx-3 px-3"
        >
          {" "}
          {user.avatar ? (
            <Card>
              <Card.Img
                src={`data:${"image/png"};base64,${new Buffer(
                  user.avatar.data
                ).toString("base64")}`}
                className={{ fluid : "true"}}
              />
            </Card>
          ) : (
            ""
          )}
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
          <Button
            variant="primary"
            type="submit"
            style={{ fontSize: "x-small" }}
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h3>My Orders</h3>
        {loadingOrders ? <Loader/> : errorOrders ? <Message variant="danger">{errorOrders}</Message>: (
          <Table striped  hover responsive className="table-sm" style={{boardered : "true"}}>
            <thead>
              <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>
                TOTAL
              </th>
              <th>
                PAID
              </th>
              <th>
                DELIVERED
              </th>
              <th>

              </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
