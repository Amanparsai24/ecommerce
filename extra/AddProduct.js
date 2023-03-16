import React, { useState } from 'react';

function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const handleAddProduct = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    fetch('/api/products', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleAddProduct}>
      <label>
        Product Name:
        <input type="text" value={name} onChange={event => setName(event.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={event => setDescription(event.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={event => setPrice(event.target.value)} />
      </label>
      <label>
        Image:
        <input type="file" accept="image/*" onChange={event => setImage(event.target.files[0])} />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;
