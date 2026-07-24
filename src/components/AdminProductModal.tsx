import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Product } from '../data/products';
import { useProducts } from '../context/ProductContext';

interface AdminProductModalProps {
  product: Product | null; // if null, we are creating a new product
  onClose: () => void;
}

const AdminProductModal: React.FC<AdminProductModalProps> = ({ product, onClose }) => {
  const { updateProduct, addProduct, deleteProduct } = useProducts();
  const isEditing = !!product;

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
    department: 'unisex',
    sizes: ['S', 'M', 'L']
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSave = () => {
    if (isEditing && product) {
      updateProduct({ ...formData, id: product.id });
    } else {
      addProduct(formData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (isEditing && product) {
      if (confirm('Are you sure you want to delete this product?')) {
        deleteProduct(product.id);
        onClose();
      }
    }
  };

  return (
    <div className="mobile-modal-layout" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'var(--bg-color)',
      zIndex: 100,
      display: 'flex'
    }}>
      {/* Left side: Image Preview */}
      <div className="mobile-modal-left" style={{
        flex: 1,
        backgroundColor: '#000',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {formData.image ? (
          <img 
            src={formData.image} 
            alt="Preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.3)' }}>No Image Preview</div>
        )}
      </div>

      {/* Right side: Edit Form */}
      <motion.div 
        className="mobile-modal-right"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{
          flex: 1,
          backgroundColor: 'var(--bg-color)',
          padding: '64px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflowY: 'auto'
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '32px',
            right: '32px',
          }}
        >
          <X size={24} />
        </button>

        <h2 style={{ fontSize: '32px', marginBottom: '32px', fontWeight: 600 }}>
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', opacity: 0.5, marginBottom: '8px', letterSpacing: '1px' }}>PRODUCT NAME</label>
            <input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '16px',
                padding: '8px 0',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', opacity: 0.5, marginBottom: '8px', letterSpacing: '1px' }}>PRICE ($)</label>
            <input 
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '16px',
                padding: '8px 0',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', opacity: 0.5, marginBottom: '8px', letterSpacing: '1px' }}>CATEGORY</label>
            <input 
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. ACCESSORIES"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '16px',
                padding: '8px 0',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', opacity: 0.5, marginBottom: '8px', letterSpacing: '1px' }}>DEPARTMENT</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '16px',
                padding: '8px 0',
                outline: 'none'
              }}
            >
              <option value="men" style={{ color: 'black' }}>Men</option>
              <option value="women" style={{ color: 'black' }}>Women</option>
              <option value="unisex" style={{ color: 'black' }}>Unisex</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', opacity: 0.5, marginBottom: '8px', letterSpacing: '1px' }}>IMAGE URL</label>
            <input 
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '16px',
                padding: '8px 0',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', opacity: 0.5, marginBottom: '8px', letterSpacing: '1px' }}>DESCRIPTION</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '14px',
                padding: '12px',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '48px' }}>
          <button 
            onClick={handleSave}
            style={{
              flex: 2,
              backgroundColor: 'var(--button-light-bg)',
              color: 'var(--button-light-text)',
              padding: '16px',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '1px'
            }}
          >
            SAVE CHANGES
          </button>
          {isEditing && (
            <button 
              onClick={handleDelete}
              style={{
                flex: 1,
                border: '1px solid #ff4444',
                color: '#ff4444',
                padding: '16px',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '1px'
              }}
            >
              DELETE
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProductModal;
