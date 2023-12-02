import React, { useState, useEffect } from 'react';
import ConfirmationModal from './components/ConfirmationModal';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    updateProductId: '',
    updateName: '',
    updatePrice: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDelete = (productId) => {
    setProductIdToDelete(productId);
    setIsModalOpen(true);
  };

  const handleSubmitCreate = (event) => {
    event.preventDefault();

    const { productName, productPrice } = formData;

    fetch(`${process.env.REACT_APP_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: productName, price: productPrice }),
    })
      .then((response) => response.json())
      .then(() => {
        loadProducts();
        setFormData({
          productName: '',
          productPrice: '',
          updateProductId: '',
          updateName: '',
          updatePrice: '',
        });
      })
      .catch((error) => console.error('Error:', error));
  };

  const loadProducts = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}AllProducts`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error:', error));
  };

const handleUpdate = (product) => {
    setFormData({
      updateProductId: product.productId,
      updateName: product.name,
      updatePrice: product.price,
      productName: '',
      productPrice: '',
    });
  };

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const { updateProductId, updateName, updatePrice } = formData;

    fetch(`${process.env.REACT_APP_BASE_URL}${updateProductId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updateName, price: updatePrice }),
    })
      .then((response) => response.json())
      .then(() => {
        loadProducts();
        setFormData({
          productName: '',
          productPrice: '',
          updateProductId: '',
          updateName: '',
          updatePrice: '',
        });
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete) {
      fetch(`${process.env.REACT_APP_BASE_URL}${productIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => loadProducts())
        .catch((error) => console.error('Error:', error))
        .finally(() => {
          setIsModalOpen(false);
          setProductIdToDelete(null);
        });
    }
  };

  return (
    <div>
      <h1>Product CRUD</h1>

      <h2>List of Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.productId}>
            ID: {product.productId}, Name: {product.name}, Price: {product.price}
            <button onClick={() => handleDelete(product.productId)}>Delete</button>
            <button onClick={() => handleUpdate(product)}>Update</button>
          </li>
        ))}
      </ul>

      <h2>Create Product</h2>
      <form onSubmit={handleSubmitCreate}>
        <label htmlFor="productName">Name:</label>
        <input
          type="text"
          id="productName"
          value={formData.productName}
          onChange={handleChange}
          required
        />
        <label htmlFor="productPrice">Price:</label>
        <input
          type="number"
          id="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
          required
        />
        <button type="submit">Create</button>
      </form>

      <h2>Update Product</h2>
      <form id="updateForm" style={{ display: formData.updateProductId ? 'block' : 'none' }}>
        <input type="hidden" id="updateProductId" />
        <label htmlFor="updateName">Name:</label>
        <input
          type="text"
          id="updateName"
          value={formData.updateName}
          onChange={handleChange}
          required
        />
        <label htmlFor="updatePrice">Price:</label>
        <input
          type="number"
          id="updatePrice"
          value={formData.updatePrice}
          onChange={handleChange}
          required
        />
        <button type="submit"  onClick={handleSubmitUpdate}>Update</button>
        <button type="button" className="cancel">
          Cancel
        </button>
      </form>

      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      
    </div>
  );
};

export default App;
