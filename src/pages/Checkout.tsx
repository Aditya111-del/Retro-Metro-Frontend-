import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cartItems, cartTotal } = useCart();
  const tax = cartTotal * 0.08; // 8% dummy tax
  const shipping = cartTotal > 0 ? 15.00 : 0;
  const finalTotal = cartTotal + tax + shipping;

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '48px',
      overflowY: 'auto'
    }} className="hide-scrollbar">
      
      <div className="mobile-checkout-layout" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        gap: '64px'
      }}>
        
        {/* Left side: Forms */}
        <div style={{ flex: 3 }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 600, 
            letterSpacing: '2px', 
            marginBottom: '48px'
          }}>
            CHECKOUT
          </h1>
          
          {/* Shipping Form */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '24px', color: 'var(--accent-color)' }}>1. SHIPPING ADDRESS</h2>
            <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <input type="text" placeholder="First Name" style={inputStyle} />
              <input type="text" placeholder="Last Name" style={inputStyle} />
              <input type="text" placeholder="Address" style={{ ...inputStyle, gridColumn: 'span 2' }} />
              <input type="text" placeholder="City" style={inputStyle} />
              <input type="text" placeholder="Postal Code" style={inputStyle} />
            </div>
          </section>

          {/* Payment Form */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '24px', color: 'var(--accent-color)' }}>2. PAYMENT METHOD</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              <input type="text" placeholder="Card Number" style={inputStyle} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <input type="text" placeholder="MM/YY" style={inputStyle} />
                <input type="text" placeholder="CVC" style={inputStyle} />
              </div>
            </div>
          </section>
          
          <button style={{
            width: '100%',
            backgroundColor: 'var(--button-light-bg)',
            color: 'var(--button-light-text)',
            padding: '20px',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '2px',
            marginTop: '24px',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          onClick={() => alert('Order Placed Successfully! (Simulation)')}
          >
            PLACE ORDER
          </button>
        </div>

        {/* Right side: Order Summary */}
        <div style={{ flex: 2 }}>
          <div style={{
            backgroundColor: '#252525',
            padding: '40px',
            borderRadius: '4px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '32px' }}>ORDER SUMMARY</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    style={{ width: '60px', height: '80px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600 }}>{item.product.name}</h3>
                    <p style={{ fontSize: '12px', color: '#a0a0a0', marginTop: '4px' }}>Size: {item.size} | Qty: {item.quantity}</p>
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
              ))}
              {cartItems.length === 0 && (
                <p style={{ color: '#a0a0a0' }}>No items in your order.</p>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={summaryRowStyle}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div style={summaryRowStyle}>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div style={summaryRowStyle}>
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ ...summaryRowStyle, marginTop: '16px', fontSize: '18px', fontWeight: 600 }}>
                <span>TOTAL</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {cartItems.length === 0 && (
               <div style={{ marginTop: '32px', textAlign: 'center' }}>
                 <Link to="/" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>Return to Shop</Link>
               </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
};

const inputStyle = {
  width: '100%',
  padding: '16px',
  backgroundColor: 'transparent',
  border: '1px solid var(--border-color)',
  color: 'var(--text-color)',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s'
};

const summaryRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  color: '#d0d0d0'
};

export default Checkout;
