import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Icon } from "semantic-ui-react";

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    price: 0,
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await axios.put(`/api/products/${product._id}`, formData);
      } else {
        await axios.post(`/api/products`, formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div>
      <h2>{product ? "Edit Product" : "Add Product"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Product Name</label>
          <input
            placeholder="Enter product name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <input
            type="number"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Image URL</label>
          <input
            placeholder="Enter image URL (optional)"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </Form.Field>
        <Button primary type="submit">
          <Icon name="save" /> Save
        </Button>
        <Button secondary type="button" onClick={onCancel}>
          <Icon name="cancel" /> Cancel
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;
