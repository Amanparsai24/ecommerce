import React, { useState } from 'react';

function Product({ id, name, price, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart({ id, name, price });
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>Price: {price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

function CartItem({ item, onRemoveFromCart }) {
  const handleRemoveFromCart = () => {
    onRemoveFromCart(item);
  };

  return (
    <div>
      <h3>{item.name}</h3>
      <p>Price: {item.price}</p>
      <button onClick={handleRemoveFromCart}>Remove from Cart</button>
    </div>
  );
}

function Cart({ items, onRemoveFromCart }) {
  return (
    <div>
      <h2>Cart</h2>
      {items.map(item => (
        <CartItem key={item.id} item={item} onRemoveFromCart={onRemoveFromCart} />
      ))}
    </div>
  );
}

function ProductList() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (item) => {
    const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(newCartItems);
  };

  return (
    <div>
      <h1>Product List</h1>
      <Product id="1" name="Product 1" price="10.00" onAddToCart={handleAddToCart} />
      <Product id="2" name="Product 2" price="20.00" onAddToCart={handleAddToCart} />
      <Product id="3" name="Product 3" price="30.00" onAddToCart={handleAddToCart} />
      <Cart items={cartItems} onRemoveFromCart={handleRemoveFromCart} />
    </div>
  );
}

export default ProductList;
