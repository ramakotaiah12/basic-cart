
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { listProductDetails, editProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../types/productTypes'
const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id;
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const {  product } = productDetails

  const productEdit = useSelector((state) => state.productEdit)
  const {
    success: successUpdate,
  } = productEdit
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/products')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])
    const submitHandler = (e)=>{
        e.preventDefault()
        const formData = new FormData();
        const _id = productId
        formData.append('name', name);
        formData.append('price', price)
        formData.append('image', image)
        formData.append('brand', brand)
        formData.append('category', category)
        formData.append('description', description)
        formData.append('countInStock', countInStock)
        console.log(formData)
        dispatch(
          editProduct(_id,formData)
        )
    }
   
    return (
        <>
 <Link to='/admin/products' className='btn btn-light my-3' style={{fontSize : "x-small"}}>
        Go Back
      </Link>
      <FormContainer>
        <h3>Edit Product</h3>
        
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group style={{ fontSize: "small" }} controlId="image">
          <Form.Label>Product picture</Form.Label>
          <input
            type="file"
            id="file"
            name="image"
            style={{ fontSize: "small" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
    
      </FormContainer>

        </>
    )
}

export default ProductEditScreen;
