import React from 'react';
import products from '../products';
import ProductCard from './ProductCard';

function ProductList({ addToCart }) {
  return (
    <section className="products-section">
      <h2 className="section-title">Explore Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
