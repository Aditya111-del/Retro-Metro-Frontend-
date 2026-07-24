import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  layoutMode?: 'carousel' | 'grid';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, layoutMode = 'carousel' }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      style={{
        width: layoutMode === 'grid' ? '100%' : 'auto',
        maxWidth: layoutMode === 'grid' ? '450px' : 'none',
        margin: layoutMode === 'grid' ? '0 auto' : '0',
        height: layoutMode === 'grid' ? 'auto' : '75vh',
        aspectRatio: '3/4',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        flexShrink: 0,
        transition: 'transform 0.3s ease',
        borderRadius: '16px',
      }}
      className="mobile-product-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(0.98)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <motion.img 
        layoutId={`product-image-${product.id}`}
        src={product.image} 
        alt={product.name}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />
      {/* Overlay text at bottom left */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        color: 'white',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <span style={{ 
          fontSize: '10px', 
          fontWeight: 600, 
          letterSpacing: '1px',
          color: 'var(--accent-color)'
        }}>
          {product.category}
        </span>
        <span style={{ 
          fontSize: '20px', 
          fontWeight: 600, 
          letterSpacing: '1px'
        }}>
          {product.name}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
