import React from 'react'
import {Link} from 'react-router-dom';
import { Card} from "react-bootstrap";

const Product = ({product}) => {

    const buffer = product.image.data;
    const b64 = new Buffer(buffer).toString('base64')
    const mimeType = "image/png";
    return (
        <Card style={{fontSize:"x-small",width: 'auto', height :"18rem"}} className="my-2 py-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img className="px-3" src={`data:${mimeType};base64,${b64}`} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <h6>{product.name}</h6>
            </Card.Title>
          </Link>
          <Card.Text as="h4" style={{fontSize: "small"}}>${product.price.toFixed(2)}</Card.Text>
        
        </Card.Body>
     
      </Card> 
    )
}

export default Product
