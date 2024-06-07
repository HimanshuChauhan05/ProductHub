import React, { useContext, useState } from "react";
import HomeBtn from "./HomeBtn";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Create = () => {
    const navigate = useNavigate()
    const [products, setProducts]=useContext(ProductContext)
    const [title, setTitle] = useState();
    const [image, setImage] = useState();
    const [category, setCategory] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();

    let uniqueCategory = products && products.reduce((acc, cv)=>[...acc, cv.category],[])
    uniqueCategory = [...new Set(uniqueCategory)]

    const addProductHandler= (e)=>{
        e.preventDefault();
        const newProduct = {
            id:nanoid(),
            title,
            image,
            category,
            price,
            description
        }
        setProducts([...products, newProduct])
        localStorage.setItem("products", JSON.stringify([...products, newProduct]));
        toast.success("Product Added Successfully");
        navigate("/")
    };
    
    
  return <>
    <div className="absolute top-9 left-7 m-2">
        <HomeBtn/>
    </div>

    
    <form onSubmit={addProductHandler} className="flex flex-col items-center p-[4%] w-screen h-screen" action="">
        <h1 className="w-1/2 text-3xl mb-5 font-semibold">Add New Products</h1>
        <input 
            className="bg-zinc-200 rounded-md p-3 w-1/2 mb-2"
            required
            type="url" 
            placeholder="Image Link" 
            onChange={(e)=> setImage(e.target.value)}
            value={image}
        />

        <input 
            className="bg-zinc-200 rounded-md p-3 w-1/2 mb-2" 
            required
            type="text" placeholder="Title" 
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
        />

        <div className="w-1/2 flex justify-between">
            <input 
                list="categories"
                className="bg-zinc-200 rounded-md p-3 w-[45%] mb-2" 
                required
                type="text" 
                placeholder="Select Category" 
                onChange={(e)=> setCategory(e.target.value)}
                value={category}
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
                onChange={(e)=> setPrice(e.target.value)}
                value={price}
            />
        </div>

        <textarea 
            className="bg-zinc-200 rounded-md p-3 w-1/2 mb-2"
            required
            rows="8"
            placeholder="Product Description" 
            onChange={(e)=> setDescription(e.target.value)}
            value={description}
        ></textarea>
       
       <div>
        <button className="bg-blue-500 text-white mt-5 font-semibold px-4 py-2 rounded-md shadow-lg" type="submit">Add Product</button>
       </div>
    </form>

  </>;
};

export default Create;
