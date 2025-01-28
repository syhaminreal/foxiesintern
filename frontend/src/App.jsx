import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);  // State to control form visibility
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);  // State for the product being edited

  // Fetching products from the API
  useEffect(() => {
    axios
      .get('/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle the Update action
  const handleUpdate = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setEditingProduct(productToEdit);
    setShowForm(true); // Show the form for editing
  };

  // Handle updating the product (via API)
  const handleSaveUpdate = () => {
    axios
      .put(`/api/products/${editingProduct.id}`, editingProduct) // PUT request to update product
      .then((response) => {
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id ? response.data : product
          )
        );
        setEditingProduct(null); // Clear the editing state
        setShowForm(false); // Hide the form after update
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle the Delete action
  const handleDelete = (id) => {
    axios
      .delete(`/api/products/${id}`)
      .then((response) => {
        setProducts(products.filter((product) => product.id !== id)); // Remove deleted product from state
        console.log(`Product with id ${id} deleted successfully`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    axios
      .post('/api/products', newProduct)
      .then((response) => {
        setProducts([...products, response.data]); // Add the new product to the state
        setShowForm(false); // Hide the form after adding
        setNewProduct({ name: '', price: '', description: '', image: '' }); // Clear the form
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle form input changes (for both add and update)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  return (
    <>
      <h1>Crud with Reed</h1>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Product'}
      </button>

      {showForm && (
        <div>
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editingProduct ? editingProduct.name : newProduct.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={editingProduct ? editingProduct.price : newProduct.price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={editingProduct ? editingProduct.description : newProduct.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={editingProduct ? editingProduct.image : newProduct.image}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={editingProduct ? handleSaveUpdate : handleAddProduct}>
              {editingProduct ? 'Save Changes' : 'Add Product'}
            </button>
          </form>
        </div>
      )}

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th> {/* Column for Update and Delete buttons */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                {product.image && <img src={product.image} alt={product.name} width="100" />}
              </td>
              <td>
                <button onClick={() => handleUpdate(product.id)}>Update</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
