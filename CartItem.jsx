import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart, removeItem, updateQuantity } from './CartSlice.jsx';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-heading">
          <p className="eyebrow">YOUR BAG</p>
          <h1>Your cart is taking a little <em>breather.</em></h1>
        </div>
        <div className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">♧</span>
          <h2>No plants here just yet</h2>
          <p>Explore the nursery and find a green friend for your space.</p>
          <Link className="button button-dark" to="/shop">Explore plants</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <p className="eyebrow">YOUR BAG</p>
        <h1>Your plants, <em>together.</em></h1>
        <p>{totalQuantity} {totalQuantity === 1 ? 'plant' : 'plants'} selected for your home</p>
      </div>

      <div className="cart-layout">
        <section className="cart-list" aria-label="Items in your shopping cart">
          {items.map((item) => (
            <article className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-product-copy">
                <h2>{item.name}</h2>
                <p>₹{item.price} each</p>
                <button className="text-button remove-button" type="button" onClick={() => dispatch(removeItem(item.id))}>
                  Remove
                </button>
              </div>
              <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                <span>{item.quantity}</span>
                <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>＋</button>
              </div>
              <strong className="line-total">₹{item.price * item.quantity}</strong>
            </article>
          ))}
          <button className="text-button clear-cart" type="button" onClick={() => dispatch(clearCart())}>Clear cart</button>
        </section>

        <aside className="order-summary">
          <p className="eyebrow">ORDER SUMMARY</p>
          <div className="summary-line"><span>Items ({totalQuantity})</span><span>₹{subtotal}</span></div>
          <div className="summary-line"><span>Delivery</span><span className="free-label">Free</span></div>
          <div className="summary-total"><span>Subtotal</span><strong>₹{subtotal}</strong></div>
          <p className="summary-note">Taxes, if applicable, are calculated at checkout.</p>
          <button className="button button-dark checkout-button" type="button" onClick={() => window.alert('Thanks for shopping at Paradise Nursery! Checkout is a demo feature.')}>Proceed to checkout <span aria-hidden="true">→</span></button>
          <Link className="continue-link" to="/shop">← Continue shopping</Link>
        </aside>
      </div>
    </main>
  );
}
