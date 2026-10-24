import React from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <main>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-kicker">A BREATH OF FRESH AIR</p>
          <h1>Paradise<br /><em>Nursery</em></h1>
          <p className="hero-description">Bring home a little nature. Discover plants that make your space feel more like you.</p>
          <button className="button button-light" type="button" onClick={() => navigate('/shop')}>Get Started <span aria-hidden="true">→</span></button>
          <div className="hero-note"><span>✳</span> Find your calm in the green</div>
        </div>
        <div className="hero-bottom"><span>PLANTS FOR EVERY SPACE</span><span>GROW SOMETHING GOOD</span></div>
      </section>
      <AboutUs />
    </main>
  );
}

function Header() {
  const items = useSelector((state) => state.cart.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="site-header">
      <Link to="/" className="brand"><span className="brand-mark">✿</span><span>paradise<span className="brand-light">nursery</span></span></Link>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/shop">Plants</NavLink>
        <a href="/#about">Our story</a>
      </nav>
      <Link to="/cart" className="cart-link"><span className="cart-icon" aria-hidden="true">♧</span><span>Cart</span><span className="cart-count">{count}</span></Link>
    </header>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <footer className="site-footer">
        <Link to="/" className="footer-brand">✿ Paradise Nursery</Link>
        <span>Make room for a little more green.</span>
        <span>© {new Date().getFullYear()} Paradise Nursery</span>
      </footer>
    </div>
  );
}
