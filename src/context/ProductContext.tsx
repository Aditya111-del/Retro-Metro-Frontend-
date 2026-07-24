import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { products as initialProducts } from '../data/products';
import type { Product } from '../data/products';

interface ProductContextType {
  products: Product[];
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = Date.now().toString(); // simple ID generation
    setProducts(prev => [...prev, { ...newProduct, id }]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, updateProduct, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
