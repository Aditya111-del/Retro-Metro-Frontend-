import React, { useState } from 'react';
import { Menu, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const { openCart, cartItems } = useCart();
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={{
      padding: '24px 48px 0 48px', // Apply horizontal padding to the outer nav
      position: 'relative',
      zIndex: 10
    }} className="mobile-nav">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--accent-color)', // Use the cream/gold accent color
      }} className="mobile-nav-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }} className="mobile-nav-inner">
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '1px'
          }}>
            {/* Placeholder logo mark */}
            <div style={{
              width: '16px',
              height: '20px',
              border: '1px solid currentColor',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ width: '4px', height: '4px', backgroundColor: 'currentColor', borderRadius: '50%', marginTop: '4px' }} />
            </div>
            RETRO METRO
          </Link>

        </div>

      <div className="mobile-nav-links" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: '0.5px'
      }}>
        {/* Category Dropdown Toggle (Desktop & Mobile) */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <Menu size={18} strokeWidth={1.5} />
            CATEGORY
          </div>
          
          {/* Mobile Dropdown Menu */}
          {isCategoryMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '16px',
              backgroundColor: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              padding: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minWidth: '150px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              zIndex: 20
            }}>
              <Link 
                to="/category/men" 
                onClick={() => setIsCategoryMenuOpen(false)}
                style={{ transition: 'color 0.2s' }} 
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'} 
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-color)'}
              >
                MEN
              </Link>
              <Link 
                to="/category/women" 
                onClick={() => setIsCategoryMenuOpen(false)}
                style={{ transition: 'color 0.2s' }} 
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'} 
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-color)'}
              >
                WOMEN
              </Link>
            </div>
          )}
        </div>
        <Link 
          to="/auth" 
          style={{ transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }} 
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'} 
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-color)'}
        >
          LOGIN
        </Link>
        <div 
          onClick={openCart}
          style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
        >
          <ShoppingBag size={18} strokeWidth={1.5} />
          {cartItemCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-12px',
              backgroundColor: 'var(--accent-color)',
              color: 'var(--bg-color)',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 600
            }}>
              {cartItemCount}
            </div>
          )}
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
