import React, { useState, useEffect } from "react";

import "./Pagination.css";
const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumber.map((number) => (
            <li key={number}>
              <button
                className={selectedPage === number ? "active" : ""}
                onClick={() => {
                  paginate(number);
                  setSelectedPage(number);
                }}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
