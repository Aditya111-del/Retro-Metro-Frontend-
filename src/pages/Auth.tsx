import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder auth logic
    navigate('/');
  };

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border-color)',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}
      >
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 600, 
          letterSpacing: '2px', 
          textAlign: 'center',
          textTransform: 'uppercase'
        }}>
          {isLogin ? 'Welcome Back' : 'Join Retro Metro'}
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Full Name" 
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-color)',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '14px',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent-color)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
            />
          )}

          <input 
            type="email" 
            placeholder="Email Address" 
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-color)',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '14px',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-color)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
          />

          <input 
            type="password" 
            placeholder="Password" 
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-color)',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '14px',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-color)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
          />

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '8px',
              backgroundColor: 'var(--accent-color)',
              color: 'var(--bg-color)',
              fontWeight: 600,
              letterSpacing: '1px',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)}
            style={{
              color: 'var(--accent-color)',
              cursor: 'pointer',
              fontWeight: 500,
              textDecoration: 'underline'
            }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
        </div>
      </motion.div>
    </main>
  );
};

export default Auth;
