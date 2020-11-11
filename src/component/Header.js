import "./Header.css";

import React, { useEffect } from "react";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import IconButton from "@material-ui/core/IconButton";

import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";
import { Link, useLocation } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

function Header() {
  const onChangeSearch = (e) => {
    dispatch({ type: "SEARCH_PRODUCT", search: e.target.value });
  };

  const [{ basket, user, search }, dispatch] = useStateValue();

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  });

  const unique = [...new Set(basket?.map((item) => item.id))];

  return (
    <div>
      <div className="header">
        <div className="header__nav">
          <div className="header__navItem">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="header__navlogo">
                <h1>
                  <span style={{ color: "#2613c1" }}>S</span>hop.
                </h1>
              </div>
            </Link>

            <div className="header__search">
              {useLocation().pathname == "/" ? (
                <input
                  type="text"
                  placeholder="Search ...."
                  onChange={onChangeSearch}
                  value={search}
                />
              ) : (
                ""
              )}
            </div>
            <div className="header__navWishlist">
              <IconButton aria-label="wishlist" className="">
                <LoyaltyOutlinedIcon fontSize="large" />
              </IconButton>
            </div>
            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <div className="header__navBag">
                <IconButton aria-label="profile" className="">
                  <ShoppingBasketOutlinedIcon fontSize="large" />
                  {unique?.length > 0 ? (
                    <p className="header__navBagIconBoxCount">
                      {unique?.length}
                    </p>
                  ) : (
                    ""
                  )}
                </IconButton>
              </div>
            </Link>
            <div className="header__navProfile">
              <IconButton aria-label="profile" className="">
                <AccountCircleOutlinedIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="header__navTrack">
        <div className="header__navTrackHome">Home</div>
        &nbsp;&nbsp;
        <ArrowForwardIosRoundedIcon fontSize="small" />
        &nbsp;&nbsp;
        <div className="header__navTrackProducts">Products</div>
      </div>
    </div>
  );
}

export default Header;
