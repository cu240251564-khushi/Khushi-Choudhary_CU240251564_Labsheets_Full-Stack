import React, { useState } from 'react';

function CheckoutForm({ cart, onOrderSuccess, onBackToCart }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !pincode || !phone) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="order-success-card">
        <div className="success-icon">🎉</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with <strong>ElectroVault</strong>, {name}.</p>
        <div className="order-details">
          <p><strong>Shipping Address:</strong> {address}, {pincode}</p>
          <p><strong>Contact Phone:</strong> {phone}</p>
          <p><strong>Payment Method:</strong> {paymentMethod}</p>
          <p><strong>Total Amount Paid:</strong> Rs {grandTotal.toFixed(2)}</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setIsSubmitted(false);
            onOrderSuccess();
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h2>Checkout & Payment</h2>
        <button className="btn-secondary" onClick={onBackToCart}>
          &larr; Back to Cart
        </button>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Shipping & Billing Details</h3>

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              placeholder="e.g. Khushi Choudhary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Full Address *</label>
            <textarea
              id="address"
              rows="3"
              placeholder="House/Flat No., Street, Area, City"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pincode">Pincode *</label>
              <input
                type="text"
                id="pincode"
                placeholder="e.g. 140413"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Credit Card">Credit / Debit Card</option>
              <option value="UPI">UPI (Google Pay / PhonePe)</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Cash on Delivery">Cash on Delivery (COD)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-accent btn-block">
            Place Order (Rs {grandTotal.toFixed(2)})
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.product.id} className="summary-item">
                <span>{item.product.name} &times; {item.quantity}</span>
                <span>Rs {(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total Payable:</span>
            <span>Rs {grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
