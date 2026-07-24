import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import AdminProductModal from '../components/AdminProductModal';
import { useProducts } from '../context/ProductContext';
import type { Product } from '../data/products';
import { AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const { products } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
  };

  const closeEdit = () => {
    setEditingProduct(null);
    setIsAddingNew(false);
  };

  return (
    <>
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div className="mobile-header-padding" style={{ padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '2px' }}>ADMIN DASHBOARD</h1>
          <button 
            onClick={() => setIsAddingNew(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--accent-color)',
              color: 'var(--bg-color)',
              padding: '12px 24px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '1px'
            }}
          >
            <Plus size={16} /> ADD PRODUCT
          </button>
        </div>

        <Carousel>
          {products.map(product => (
            <div key={product.id} style={{ position: 'relative' }}>
              <ProductCard 
                product={product} 
                onClick={handleEditClick} 
              />
              <div 
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '4px 12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  pointerEvents: 'none'
                }}
              >
                CLICK TO EDIT
              </div>
            </div>
          ))}
        </Carousel>
      </main>

      <AnimatePresence>
        {(editingProduct || isAddingNew) && (
          <AdminProductModal 
            key="admin-modal"
            product={editingProduct} 
            onClose={closeEdit} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminDashboard;
