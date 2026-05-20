import React, { useEffect, useState } from "react";
import "./Scrolling.css";

const ProductCards = ({ image, title }) => {
  return (
    <div className="product-card">
      {" "}
      <img src={image} alt={title} className="product-img" />
      <span className="product-title">{title}</span> {/* 👈 Added class */}
    </div>
  );
};
const PAGE_SIZE = 12;

const Scrolling = () => {
  const [products, setProducts] = useState([]);
  const [currentpage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
  };
  const handlePageChange = (elem) => {
    setCurrentPage(elem);
  };
  const goToNextPage = ()=>{
    setCurrentPage((prev)=>prev+1)
  }
  const goToPreviousPage = ()=>{
    setCurrentPage((prev)=>prev-1)
  }

  useEffect(() => {
    fetchData();
  }, []);
  const total_products = products.length;
  const noOfPages = Math.ceil(total_products / PAGE_SIZE);
  const start = currentpage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return !products.length ? (
    <h1>No products Found</h1>
  ) : (
    <div>
      {" "}
      <div className="array_val">
        <button onClick={()=>goToPreviousPage()} className="page_no" disabled={currentpage==0}>◀️</button>
        {[...Array(noOfPages).keys()].map((elem) => {
          return (
            <button
              className={"page_no"+ (elem===currentpage ? "active" :"")}
              keys={elem}
              onClick={()=>handlePageChange(elem)}
            >
              {elem}
            </button>
          );
        })}
        <button onClick={()=>goToNextPage()} disabled={currentpage===noOfPages-1} className="page_no ">▶️</button>
      </div>
      <div className="products-grid">
        {products.slice(start, end).map((elem) => {
          return (
            <ProductCards
              key={elem.id}
              image={elem.thumbnail}
              title={elem.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Scrolling;
