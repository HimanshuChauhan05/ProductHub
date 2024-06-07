import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";
import HomeBtn from "./HomeBtn";

function Nav() {

    const [products] = useContext(ProductContext);

    let uniqueCategory = products && products.reduce((acc, cv)=>[...acc, cv.category],[])
    uniqueCategory = [...new Set(uniqueCategory)]
    
    const uniquecolor = ()=>{
        return `rgba(${(Math.random()*255).toFixed()},
        ${(Math.random()*255).toFixed()},
        ${(Math.random()*255).toFixed()},
        ${(Math.random()*255).toFixed()})`
    };


  return <>
    <nav className=" w-[20%] h-full bg-zinc-100 flex flex-col items-center pt-5" >
        <div className="flex gap-7 mt-4">
            <HomeBtn />
            <Link to={"/create"} className="bg-red-500 mb-4 px-2 py-2 rounded-lg text-white font-semibold" href="">Add new Products</Link>
        </div>
        <hr className="w-[80%]"/>

        <h1 className="mt-2 text-2xl font-semibold w-[80%] mb-1">Categories</h1>
        <div className="w-[80%] capitalize">

            {uniqueCategory.map((categ,index)=>(
                <Link 
                    key={index} 
                    to={`/?category=${categ}`} 
                    className=" mb-2 text-lg font-lightbold flex items-center gap-1"> 
                    <span style={{backgroundColor:uniquecolor()}} className="mx-1 w-[10px] h-[10px] rounded-full"></span>

                    {categ}
                </Link>
            ))}

            
        </div>
    </nav>
</>

}

export default Nav;
