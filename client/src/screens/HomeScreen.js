import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      {!keyword && (
        <Container>
        <div className="carousel-div">
          <ProductCarousel />
        </div>
        </Container>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="secondary">{error}</Message>
      ) : (
        <>
      <Container>
          <Row  sm={6} >
            {products.map((product) => (
              <Col
                key={product._id}
                xs={12}
                sm={6}
                md={3}
                lg={3}
                style={{ display: "flex" }}
              >
                <Product product={product} />
              </Col>
            ))}
            
          </Row>
          </Container>
          <Container >
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
          </Container>
        </>
      )}
    </>
  );
};

export default HomeScreen;
