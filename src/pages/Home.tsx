import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import ProductDetail from '../components/ProductDetail';
import { useProducts } from '../context/ProductContext';
import type { Product } from '../data/products';
import { Link } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

const Home: React.FC = () => {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative'
      }}>
        <Carousel>
          {products.slice(0, 4).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={handleProductClick} 
            />
          ))}
        </Carousel>

        {/* Footer Link */}
        <div style={{
          padding: '32px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Link to="/category/men" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '1px',
            color: 'var(--accent-color)',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            EXPLORE {products.length} PRODUCTS <ArrowRight size={16} strokeWidth={2} />
          </Link>
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

export default Home;
