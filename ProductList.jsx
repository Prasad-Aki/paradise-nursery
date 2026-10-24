import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

const products = [
  { id: 1, name: 'Snake Plant', category: 'Low Maintenance', price: 299, image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7a?auto=format&fit=crop&w=900&q=85', description: 'A sculptural favourite that suits bright or indirect light.' },
  { id: 2, name: 'Monstera Deliciosa', category: 'Statement Plants', price: 699, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=85', description: 'Beautiful split leaves bring a tropical feel indoors.' },
  { id: 3, name: 'Golden Pothos', category: 'Trailing Plants', price: 249, image: 'https://images.unsplash.com/photo-1616690248157-7f4f7f7e7b20?auto=format&fit=crop&w=900&q=85', description: 'A leafy trailing plant for shelves and hanging planters.' },
  { id: 4, name: 'Peace Lily', category: 'Flowering Plants', price: 499, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=900&q=85', description: 'Elegant green foliage with graceful white blooms.' },
  { id: 5, name: 'ZZ Plant', category: 'Low Maintenance', price: 399, image: 'https://images.unsplash.com/photo-1632207691143-643e2a4a9361?auto=format&fit=crop&w=900&q=85', description: 'Glossy leaves and an easygoing nature for busy days.' },
  { id: 6, name: 'Rubber Plant', category: 'Statement Plants', price: 599, image: 'https://images.unsplash.com/photo-1602491674275-ec1e9e4b2a8c?auto=format&fit=crop&w=900&q=85', description: 'Bold, deep-green leaves make a striking corner accent.' }
];

const categories = ['All Plants', ...new Set(products.map((product) => product.category))];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [category, setCategory] = useState('All Plants');

  const visibleProducts = useMemo(
    () => category === 'All Plants' ? products : products.filter((product) => product.category === category),
    [category]
  );

  const quantityInCart = (id) => cartItems.find((item) => item.id === id)?.quantity ?? 0;

  return (
    <main className="shop-page">
      <section className="shop-heading">
        <div>
          <p className="eyebrow">THE PLANT SHOP</p>
          <h1>Find your new favourite <em>green friend.</em></h1>
          <p>Thoughtful greenery for desks, shelves, sunny corners, and everything in between.</p>
        </div>
        <div className="shop-count">{products.length}<span> plants to explore</span></div>
      </section>

      <div className="category-row" aria-label="Filter plants by category">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={`category-chip ${category === item ? 'active' : ''}`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="product-grid" aria-label="Plant products">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <img src={product.image} alt={product.name} loading="lazy" />
              <span className="product-tag">{product.category}</span>
            </div>
            <div className="product-info">
              <div className="product-title-row">
                <h2>{product.name}</h2>
                <strong>₹{product.price}</strong>
              </div>
              <p>{product.description}</p>
              <button
                className="button button-dark add-button"
                type="button"
                onClick={() => dispatch(addItem(product))}
              >
                {quantityInCart(product.id) ? `Add another · ${quantityInCart(product.id)} in cart` : 'Add to cart'}
                <span aria-hidden="true">＋</span>
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
