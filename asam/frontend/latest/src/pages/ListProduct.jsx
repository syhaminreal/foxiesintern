import React from "react";

const ListProduct = () => {
  // Sample product data
  const products = [
    { id: 1, name: "Product 1", price: "$10", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", price: "$20", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="container mt-5">
      <h2>Product List</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
