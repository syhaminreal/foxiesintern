import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Icon } from "semantic-ui-react";

const ProductList = ({ onEdit, onView }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <Button primary onClick={() => onEdit(null)}>
        <Icon name="plus" /> Add Product
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product._id}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.quantity}</Table.Cell>
              <Table.Cell>${product.price.toFixed(2)}</Table.Cell>
              <Table.Cell>
                <Button icon color="blue" onClick={() => onView(product)}>
                  <Icon name="eye" />
                </Button>
                <Button icon color="yellow" onClick={() => onEdit(product)}>
                  <Icon name="edit" />
                </Button>
                <Button icon color="red" onClick={() => handleDelete(product._id)}>
                  <Icon name="trash" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ProductList;
