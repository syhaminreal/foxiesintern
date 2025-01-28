import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      <h1>Crud with Reed</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
          
        ))}
      </ul>
    </>
  );
}

export default App;
