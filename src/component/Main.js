import "./Main.css";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import { useLocation } from "react-router-dom";

function Main() {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [catagories, setCatagories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [loading, setLoading] = useState(false);
  const [sortValue, setSortValue] = useState("all");

  const [url, setUrl] = useState("https://fakestoreapi.com/products");

  const selectSortOption = (e) => {
    setSortValue(e.target.value);

    if (e.target.value == "desc") {
      setUrl("https://fakestoreapi.com/products?sort=desc");
    }
    if (e.target.value == "asc") {
      setUrl("https://fakestoreapi.com/products?sort=asc");
    }
    if (e.target.value == "low") {
      products.sort((a, b) => a.price - b.price);
    }
    if (e.target.value == "high") {
      products.sort((a, b) => b.price - a.price);
    }
  };
  useEffect(() => {
    setLoading(true);

    const getProducts = async () => {
      const response = await fetch(url);

      const jsonResponse = await response.json();

      const listCatagories = jsonResponse.map((product, index) => ({
        category: product.category,
      }));
      const unique = [...new Set(listCatagories.map((item) => item.category))];
      setCatagories(unique);

      if (selectedCat == "all") {
        setProducts(jsonResponse);
        setLoading(false);
      } else {
        let response = await fetch(
          `https://fakestoreapi.com/products/category/${selectedCat}`
        );
        const jsonRespons = await response.json();

        setProducts(jsonRespons);
        setLoading(false);
      }
    };
    getProducts();
  }, [selectedCat, url]);

  return (
    <div className="main">
      <div className="main__left">
        <div className="main__leftFilter">
          <p>FILTER</p>
        </div>
        <div className="main__leftCat" style={{ textTransform: "capitalize" }}>
          <p>Categories</p>
          <div className="main__leftCatList">
            <ul
              id="nav"
              style={{
                listStyleType: "none",
                paddingLeft: " inherit",
                cursor: "pointer",
              }}
            >
              <li className={selectedCat == "all" ? "active" : ""}>
                <a onClick={() => setSelectedCat("all")}>All</a>
              </li>
              {catagories.map((item, i) => {
                return (
                  <li className={selectedCat == item ? "active" : ""}>
                    <a onClick={() => setSelectedCat(item)}>{item}</a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="main__leftCatList"></div>
        </div>
      </div>

      <div className="main__right">
        <div className="main__rightSort">
          <label htmlFor="prices">SORT BY :</label>
          <select
            name="prices"
            id="price"
            value={sortValue}
            onChange={selectSortOption}
          >
           
            <option value="asc">What's New</option>
            <option value="desc">Poupularity</option>
            <option value="high">Price : High to Low</option>
            <option value="low">Price : Low to High</option>
          </select>
        </div>
        <div className="main__rightProduct">
          {loading == true ? (
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/f3207936088953.570ea9f49d30f.gif"
              alt=""
            />
          ) : (
            <Product products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Main;
