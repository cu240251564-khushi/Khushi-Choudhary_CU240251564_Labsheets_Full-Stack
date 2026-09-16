import React from 'react';

function Cart({ cart, removeFromCart, updateQuantity, onCheckoutClick, onClose }) {
  // Calculate grand total
  const grandTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        {onClose && (
          <button className="btn-close" onClick={onClose} aria-label="Close cart">
            &times;
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p className="empty-cart-message">Your cart is empty</p>
          <p className="empty-cart-subtext">Looks like you haven't added any products yet.</p>
        </div>
      ) : (
        <>
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const subtotal = item.product.price * item.quantity;
                  return (
                    <tr key={item.product.id}>
                      <td className="cart-product-cell">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="cart-item-img"
                        />
                        <span className="cart-item-name">{item.product.name}</span>
                      </td>
                      <td>Rs {item.product.price.toFixed(2)}</td>
                      <td>
                        <div className="quantity-controls">
                          <button 
                            className="btn-qty" 
                            onClick={() => updateQuantity(item.product.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button 
                            className="btn-qty" 
                            onClick={() => updateQuantity(item.product.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="subtotal-cell">Rs {subtotal.toFixed(2)}</td>
                      <td>
                        <button 
                          className="btn-remove"
                          onClick={() => removeFromCart(item.product.id)}
                          title="Remove item"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cart-footer">
            <div className="grand-total-section">
              <span>Grand Total:</span>
              <span className="grand-total-amount">Rs {grandTotal.toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <button 
                className="btn btn-accent btn-checkout" 
                onClick={onCheckoutClick}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
