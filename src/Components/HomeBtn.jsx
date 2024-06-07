import React from "react";
import { Link, useLocation } from "react-router-dom";

const HomeBtn = () => {

  const{search, pathname} = useLocation();

  

  return <>

  {(pathname != "/" || search.length>0) &&(
    <Link to={"/"} className="bg-blue-500 mb-4 px-2 py-2 rounded-lg text-white font-semibold">
    Home
  </Link>
)}
    
  </>
}
export default HomeBtn;
