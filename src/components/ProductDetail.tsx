import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || null);
    } else {
      setSelectedSize(null);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product, selectedSize);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100dvh',
      zIndex: 50,
      display: 'block'
    }}>
      {/* Background Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />

      <div 
        className="mobile-modal-layout"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '1000px',
          height: '100%',
          display: 'flex',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
          pointerEvents: 'none' // Let clicks pass through if clicking outside the panel
        }}
      >
        {/* Left half: Full height image with shared layoutId */}
        <div className="mobile-modal-left" style={{ flex: 1, height: '100%', overflow: 'hidden', pointerEvents: 'auto' }}>
          <motion.img 
            layoutId={`product-image-${product.id}`}
            src={product.image} 
            alt={product.name} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Right half: Details */}
        <motion.div 
          className="mobile-modal-right"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }}
          style={{ 
            flex: 1, 
            padding: '60px 48px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            backgroundColor: 'var(--bg-color)',
            pointerEvents: 'auto'
          }}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.2s',
              zIndex: 10
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <X size={24} strokeWidth={1} />
          </button>

          <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                letterSpacing: '2px',
                color: 'var(--text-color)',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                {product.category}
              </div>
              <h2 className="mobile-modal-title" style={{ 
                fontSize: '28px', 
                fontWeight: 500, 
                letterSpacing: '1px',
                marginBottom: '16px',
                textTransform: 'uppercase',
                color: 'var(--accent-color)'
              }}>
                {product.name}
              </h2>
              <div className="mobile-modal-price" style={{ 
                fontSize: '20px', 
                fontWeight: 400,
                marginBottom: '16px'
              }}>
                ${product.price.toFixed(2)}
              </div>
              
              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'var(--border-color)',
                marginBottom: '16px'
              }} />

              <p className="mobile-modal-desc" style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#a0a0a0',
                marginBottom: '16px',
                fontWeight: 300
              }}>
                {product.description}
              </p>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mobile-modal-size-selector" style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', marginBottom: '12px' }}>
                    SELECT SIZE
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          padding: '12px 20px',
                          border: `1px solid ${selectedSize === size ? 'var(--accent-color)' : 'var(--border-color)'}`,
                          backgroundColor: selectedSize === size ? 'var(--accent-color)' : 'transparent',
                          color: selectedSize === size ? 'var(--bg-color)' : 'var(--text-color)',
                          fontSize: '14px',
                          fontWeight: 500,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  className="mobile-modal-btn"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  style={{
                    flex: 1,
                    border: '1px solid var(--border-color)',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '1px',
                    transition: 'all 0.2s ease',
                    opacity: selectedSize ? 1 : 0.5,
                    cursor: selectedSize ? 'pointer' : 'not-allowed',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedSize) e.currentTarget.style.backgroundColor = 'var(--border-color)';
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSize) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  ADD TO CART
                </button>
                <button className="mobile-modal-btn" style={{
                  flex: 1,
                  backgroundColor: 'var(--button-light-bg)',
                  color: 'var(--button-light-text)',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                >
                  BUY NOW
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
