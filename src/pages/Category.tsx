import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductDetail from '../components/ProductDetail';
import { useProducts } from '../context/ProductContext';
import type { Product } from '../data/products';

import { AnimatePresence } from 'framer-motion';

const Category: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products by department (e.g., 'men' or 'women')
  const categoryProducts = products.filter(
    p => p.department.toLowerCase() === departmentId?.toLowerCase()
  );

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '48px',
        overflowY: 'auto'
      }} className="mobile-header-padding hide-scrollbar">
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 600, 
          letterSpacing: '2px', 
          marginBottom: '48px',
          textTransform: 'uppercase'
        }}>
          {departmentId}
        </h1>
        
        <div className="mobile-grid-1" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '48px',
          paddingBottom: '48px'
        }}>
          {categoryProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product} 
              onClick={handleProductClick} 
              layoutMode="grid"
            />
          ))}
          {categoryProducts.length === 0 && (
            <div style={{ color: '#a0a0a0', fontSize: '16px' }}>
              No products found in this category.
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            key="product-detail"
            product={selectedProduct} 
            onClose={closeDetail} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Category;
