import React from 'react';

function Navbar({ cartCount, isCartOpen, toggleCart, currentView, setCurrentView }) {
  return (
    <header className="navbar-header">
      <nav className="navbar">
        <a 
          href="#home" 
          className="brand-logo"
          onClick={(e) => {
            e.preventDefault();
            setCurrentView('shop');
          }}
        >
          ⚡ ElectroVault
        </a>

        <ul className="nav-links">
          <li>
            <button 
              className={`nav-btn ${currentView === 'shop' && !isCartOpen ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('shop');
                if (isCartOpen) toggleCart();
              }}
            >
              Shop
            </button>
          </li>
          <li>
            <button 
              className={`nav-cart-btn ${isCartOpen ? 'active' : ''}`}
              onClick={toggleCart}
              title="Toggle Cart"
            >
              <span className="cart-icon">🛒</span>
              <span className="cart-text">Cart</span>
              <span className="cart-badge">{cartCount}</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
