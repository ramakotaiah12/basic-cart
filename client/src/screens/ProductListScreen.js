import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts, deleteProduct, } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from '../types/productTypes'

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  

  useEffect(() => {
    dispatch({type : PRODUCT_CREATE_RESET})
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    dispatch(listProducts('', pageNumber));
  }, [dispatch, history, successDelete, userInfo, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ...?")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = ()=>{
    history.push("/admin/product/create")
  }
  return (
    <>
      <Row className="align-items-center" >
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="text-right">
            <Button variant="light" className="btn-sm" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> create product
            </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true}/>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
