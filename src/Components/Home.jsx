import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";


const Home = () => {

    const [products] = useContext(ProductContext);
    const {search} = useLocation();
    const category = decodeURIComponent(search.split('=')[1]);
    const [filteredproduct, setfilteredproduct]= useState(null);

    useEffect(()=>{
        if(!filteredproduct || category=="undefined") setfilteredproduct(products)
        if(category != "undefined") {
            setfilteredproduct(products.filter(p=>p.category==category))
        }
    }, [category, products])

  return products ?  (
    <>

    <Nav/>

    <div className="w-[80%] p-10 pt-[5%] flex flex-wrap gap-6 overflow-x-hidden overflow-y-auto ">

        {filteredproduct && filteredproduct.map((product, index) => (
            <Link key={product.id}
                to={`/Details/${product.id}`}
                className="card p-2 border shadow rounded-md w-[18%] h-[35vh] flex flex-col justify-center items-center"
            >


                <div className="hover:scale-110 w-full h-[80%] bg-contain bg-no-repeat bg-center mb-5" 
                    style={{backgroundImage:`url(${product.image})`}}>
                </div>
                <h1>{product.title}</h1>
                
            </Link>
        ))}
    
        
    </div>
</>
)   : <Loading/>;
};

export default Home;
