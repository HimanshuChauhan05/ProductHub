import axios from './axios';
import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        return JSON.parse(savedProducts);
      } catch (error) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios('/products/');
        setProducts(data);
        localStorage.setItem('products', JSON.stringify(data));
      } catch (error) {
      }
    };

    if (products.length === 0) {
      fetchProducts();
    }
  }, [products]);

  useEffect(() => {
  }, [products]);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
