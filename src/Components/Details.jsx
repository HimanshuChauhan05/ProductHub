import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "./axios";
import Loading from "./Loading";
import HomeBtn from "./HomeBtn";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Details = () => {
  const navigate = useNavigate()

  const [products, setProducts]=useContext(ProductContext)

  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(()=>{
    if(!product){
      setProduct(products.filter((p)=> p.id == id)[0])
    }
  },[]);

  const productDeleteHandler = (id)=>{
    const filteredproduct = products.filter((p)=> p.id !== id);
    setProducts(filteredproduct);
    localStorage.setItem("products", JSON.stringify(filteredproduct));
    toast.success("Product Deleted Successfully");
    navigate("/");
  }


  return product ? (
    <>
    <div className="w-[70%] h-[80%] bg-zinc-200 rounded-lg m-auto p-[6%] flex items-center justify-between gap-20 border shadow-2xl">
      <div className="absolute top-9 left-7 m-2">
        <HomeBtn/>
      </div>
      <img 
        className="h-full w-[40%] object-contain rounded-lg shadow-lg border"
        src={`${product.image}`} alt="" 
      />

      <div className="content flex flex-col">
        <h1 className="text-3xl">{product.title}</h1>
        <h2 className="text-red-400 text-lg">${product.price}</h2>
        <h3 className="text-zinc-800 text-base capitalize font-semibold">{product.category}</h3>
        <p className="text-base">{product.description}</p>
        <div className="flex gap-7 mt-3 ">
          <Link to={`/edit/${product.id}`} className="bg-blue-500 flex justify-center  mb-4 px-2 py-2 rounded-lg text-white font-semibold shadow">
            Edit Item
          </Link>
          <button onClick={()=>productDeleteHandler(product.id)} className="bg-red-500 flex justify-center mb-4 px-2 py-2 rounded-lg text-white font-semibold shadow-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  </>
  )
  : <Loading/>
};

export default Details;
