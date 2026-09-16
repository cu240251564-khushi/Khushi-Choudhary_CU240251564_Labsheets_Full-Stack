import React from 'react';

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="price">Rs {product.price.toFixed(2)}</span>
          <button 
            className="btn btn-primary" 
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
