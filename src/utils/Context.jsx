import axios from "./axios";
import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();
const getProducts = async()=>{
    try {
        const { data } = await axios("/products/")
        setProducts(data)
        
    } catch (error) {
        console.log(error);
    }
};
useEffect(()=>{
    getProducts();
}, []);

const Context = (props) => {

    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products"))||null);

    return <>
        <ProductContext.Provider value={[products, setProducts]}>
            {props.children}
        </ProductContext.Provider>
    </>;
};

export default Context;
