import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { Carousel, Image } from "react-bootstrap";
import { listLowProducts } from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productLowPrice = useSelector((state) => state.productLowPrice);
  const { loading, error, products } = productLowPrice;
  useEffect(() => {
    dispatch(listLowProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className=""style={{backgroundColor : '#777'}}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={`data:${"image/png"};base64,${new Buffer(
                product.image.data
              ).toString("base64")}`}
              fluid
              style={{backgroundColor : "#777"}}
            />
           
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
