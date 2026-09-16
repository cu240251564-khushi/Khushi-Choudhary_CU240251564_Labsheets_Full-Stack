import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import './index.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('shop'); // 'shop' | 'checkout'
  const [toastMessage, setToastMessage] = useState('');

  // Calculate total items count in cart for badge
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Helper to trigger toast notifications
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  // Add to cart handler (Task 5)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });

    showToast(`Added "${product.name}" to cart!`);
  };

  // Remove from cart handler (Task 6)
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  // Update quantity handler
  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  // Toggle Cart visibility (Task 7)
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Navigate to checkout
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  // Handle successful order completion
  const handleOrderSuccess = () => {
    setCart([]);
    setCurrentView('shop');
    showToast('🎉 Order placed successfully!');
  };

  return (
    <div className="app-container">
      {/* Navbar with Cart Toggle & Badge */}
      <Navbar
        cartCount={cartCount}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}

      {/* Main Content Area */}
      <main className="main-content">
        {currentView === 'shop' && (
          <>
            <section className="hero-banner">
              <h1>Welcome to <span>ElectroVault</span></h1>
              <p>Your one-stop destination for cutting-edge tech gadgets & accessories.</p>
            </section>
            <ProductList addToCart={addToCart} />
          </>
        )}

        {currentView === 'checkout' && (
          <CheckoutForm
            cart={cart}
            onOrderSuccess={handleOrderSuccess}
            onBackToCart={() => {
              setCurrentView('shop');
              setIsCartOpen(true);
            }}
          />
        )}
      </main>

      {/* Cart Drawer / Modal (Task 7 & 9) */}
      {isCartOpen && (
        <div className="cart-modal-overlay" onClick={toggleCart}>
          <div
            className="cart-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              onCheckoutClick={handleProceedToCheckout}
              onClose={toggleCart}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>Support: <a href="mailto:support@electrovault.com">support@electrovault.com</a></p>
        <p>&copy; 2026 ElectroVault Inc. All rights reserved. | Full Stack Lab 3</p>
      </footer>
    </div>
  );
}

export default App;
