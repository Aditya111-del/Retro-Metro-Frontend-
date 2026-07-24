import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      zIndex: 100,
      pointerEvents: isCartOpen ? 'auto' : 'none',
    }}>
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          opacity: isCartOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        maxWidth: '450px',
        height: '100%',
        backgroundColor: 'var(--bg-color)',
        transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '1px' }}>YOUR CART</h2>
          <button onClick={closeCart} style={{ transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }} className="hide-scrollbar">
          {cartItems.length === 0 ? (
            <p style={{ color: '#a0a0a0', textAlign: 'center', marginTop: '40px' }}>Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  style={{ width: '80px', height: '100px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600 }}>{item.product.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} style={{ color: '#a0a0a0', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-color)'} onMouseLeave={e => e.currentTarget.style.color = '#a0a0a0'}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p style={{ fontSize: '12px', color: '#a0a0a0', marginTop: '4px' }}>Size: {item.size}</p>
                  <p style={{ fontSize: '12px', color: '#a0a0a0' }}>Qty: {item.quantity}</p>
                  <p style={{ 
                    fontSize: '11px', 
                    color: '#777', 
                    marginTop: '8px',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.product.description}
                  </p>
                  <div style={{ marginTop: 'auto', fontSize: '14px', fontWeight: 500, paddingTop: '8px' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 600 }}>
              <span>TOTAL</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              style={{
                width: '100%',
                backgroundColor: 'var(--button-light-bg)',
                color: 'var(--button-light-text)',
                padding: '16px',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '1px',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;
