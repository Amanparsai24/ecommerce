import React, { useState } from 'react';

function AddCategory() {
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const categoryData = { name: category, subcategories: subcategories };

    fetch('/api/add-category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, '']);
  };

  const handleSubcategoryChange = (index, value) => {
    const newSubcategories = [...subcategories];
    newSubcategories[index] = value;
    setSubcategories(newSubcategories);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category:
        <input type="text" value={category} onChange={event => setCategory(event.target.value)} />
      </label>
      <br />
      <label>Subcategories:</label>
      <br />
      {subcategories.map((subcategory, index) => (
        <input key={index} type="text" value={subcategory} onChange={event => handleSubcategoryChange(index, event.target.value)} />
      ))}
      <button type="button" onClick={handleAddSubcategory}>Add Subcategory</button>
      <br />
      <button type="submit">Add Category</button>
    </form>
  );
}

export default AddCategory;
