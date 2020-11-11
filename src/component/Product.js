import React, { useState, useEffect } from "react";
import "./Product.css";
import { useStateValue } from "../context/StateProvider";

import Pagination from "./Pagination";
import { Link } from "react-router-dom";

function Product({ products }) {
  const [{ basket, user, search }, dispatch] = useStateValue();
  const [items, setItem] = useState(products);

  const [loging, setLoding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(6);

  let filterdProducts = products;

  if (search != "") {
    filterdProducts = products?.filter((i) => {
      return (
        i.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        i.description.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        i.category.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    });
  }

  const IndexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = IndexOfLastPost - postsPerPage;
  const currentPosts = filterdProducts.slice(indexOfFirstPost, IndexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="product">
        {currentPosts.map((product, index) => {
          return (
            <Link
              to={{
                pathname: "/productdetail/"+product.id,
                state: product.id,
                
              }}
              query={{ the: 'query' }}
              key={`${product.title}-${index}`}
              className="product__productList"
              style={{ textDecoration: "none" }}
            >
              <div className="product__productListImage">
                <img
                  className="product__productImage"
                  src={product.image}
                  alt=""
                />
              </div>
              <div className="product__productListTitle">
                <p>{product.title}</p>
                {Array(Math.floor(Math.random() * 4) + 2)
                  .fill()
                  .map((_, i) => (
                    <span className="productdetalis__rating">★</span>
                  ))}
              </div>
              <div className="product__productListPrice">
                $&nbsp;{product.price}
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination
        postPerPage={postsPerPage}
        totalPosts={filterdProducts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Product;
