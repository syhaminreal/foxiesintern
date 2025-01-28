import React from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <Modal open={!!product} onClose={onClose} size="small">
      <Modal.Header>Product Details</Modal.Header>
      <Modal.Content>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>
        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
        {product.image && (
          <p>
            <strong>Image:</strong>
            <br />
            <img src={product.image} alt={product.name} style={{ maxWidth: "100%" }} />
          </p>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button secondary onClick={onClose}>
          <Icon name="close" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ProductDetails;
