import axios from './axios';
import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        console.log('Loading products from localStorage');
        return JSON.parse(savedProducts);
      } catch (error) {
        console.error('Error parsing products from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios('/products/');
        console.log('Fetching products from API');
        setProducts(data);
        localStorage.setItem('products', JSON.stringify(data));
      } catch (error) {
        console.log('Error fetching products from API:', error);
      }
    };

    if (products.length === 0) {
      fetchProducts();
    }
  }, [products]);

  useEffect(() => {
    console.log('Products state updated:', products);
  }, [products]);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
