import React, { useContext, useEffect, useState } from "react";
import HomeBtn from "./HomeBtn";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

function Edit() {
    const [products, setProducts]=useContext(ProductContext)
    const navigate = useNavigate()
    const { id } =useParams();
    const [product, setProduct] = useState({
        title: "",
        image: "",
        category: "",
        price: "",
        description: ""
    });
    
    
    
    const changeHandler = (e)=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }
        
    useEffect(()=>{
        setProduct(products.filter(p=>p.id==id)[0])
    
    }, [id])
        
    let uniqueCategory = products && products.reduce((acc, cv)=>[...acc, cv.category],[])
    uniqueCategory = [...new Set(uniqueCategory)]


    const addProductHandler= (e)=>{
        e.preventDefault();
        
        const pi = products.findIndex(p=>p.id==id);
        const copyData = [...products];
        copyData[pi]  = {...products[pi], ...product};
        setProducts(copyData);
        localStorage.setItem("products", JSON.stringify(copyData));
        toast.success("Product Edited Successfully");
        navigate(-1);
    }

  return <>
    <div className="absolute top-9 left-7 m-2">
        <HomeBtn/>
    </div>
    <form onSubmit={addProductHandler} className="flex flex-col items-center p-[4%] w-screen h-screen" action="">
        <h1 className="w-1/2 text-3xl mb-5 font-semibold">Edit Product</h1>
        <input 
            className="bg-zinc-200 rounded-md p-3 w-1/2 mb-2"
            required
            type="url" 
            placeholder="Image Link" 
            name="image"
            onChange={changeHandler}
            value={product && product.image}
        />

        <input 
            className="bg-zinc-200 rounded-md p-3 w-1/2 mb-2" 
            required
            type="text" placeholder="Title" 
            name="title"
            onChange={changeHandler}
            value={product && product.title}
        />

        <div className="w-1/2 flex justify-between">
            <input 
                list="categories"
                className="bg-zinc-200 rounded-md p-3 w-[45%] mb-2" 
                required
                type="text" 
                placeholder="Select Category" 
                name="category"
                onChange={changeHandler}
                value={product && product.category}
            />
            <datalist id="categories">
            {uniqueCategory.map((categ,index)=>(
                <option key={index} value={categ} />
            ))}

            </datalist>

            <input 
                className="bg-zinc-200 rounded-md p-3 w-[45%] mb-2" 
                required
                type="number" placeholder="Price" 
                name="price"
                onChange={changeHandler}
                value={product && product.price}
            />
        </div>

        <textarea 
            className="bg-zinc-200 rounded-md p-3 w-1/2 mb-2"
            required
            rows="8"
            placeholder="Product Description" 
            name="description"
            onChange={changeHandler}
            value={product && product.description}
        ></textarea>
       
       <div>
        <button className="bg-blue-500 text-white mt-5 font-semibold px-4 py-2 rounded-md shadow-lg" type="submit">
            Edit Product
        </button>
       </div>
    </form>
  </>

}

export default Edit;
