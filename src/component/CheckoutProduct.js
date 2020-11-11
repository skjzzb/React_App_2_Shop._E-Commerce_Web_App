import "./CheckoutProduct.css";
import React, { useState, useEffect } from "react";

import { useStateValue } from "../context/StateProvider";
import Swal from "sweetalert2";

function CheckoutProduct({
  id,
  title,
  price,
  category,
  description,
  image,
  qty,
}) {
  const [{ basket }, dispatch] = useStateValue();
  const [updateQty, setUpdateQty] = useState(qty);
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  });
  const updateToBasketAdd = () => {
    dispatch({
      type: "UPDATE_TO_BASKET",
      qty: qty + 1,
      id: id,
    });
  };
  const updateToBasketSub = () => {
    dispatch({
      type: "UPDATE_TO_BASKET",
      qty: qty - 1,
      id: id,
    });
  };

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      customClass: "swal-wide",
      title: title,
      text: "Sucessfully Removed",
      imageUrl: image,
      imageWidth: 40,
      imageHeight: 40,
      showConfirmButton: false,
      showCloseButton: true,

      timer: 2500,
    });
  };
  const handleChangeQtyAdd = () => {
    setUpdateQty(qty + 1);
  };
  const handleChangeQtySub = () => {
    setUpdateQty(qty - 1);
  };

  return (
    <div className="checkoutProduct">
      <img src={image} alt="" className="checkoutProduct__image" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <strong>
            <small>$</small> {price}
          </strong>
        </p>
        <p>QTY : x {qty}</p>
        <div className="checkoutProduct__rating">
          {Array(Math.floor(Math.random() * 5) + 1)
            .fill()
            .map((_, i) => (
              <p>★</p>
            ))}
        </div>
        <div className="productdetalis__rightCartQty">
          <div
            className="productdetalis__rightCartQtyDisplay"
            placeholder="QTY"
            name="cars"
            id="cars"
          >
            <small>
              <p>QTY : {qty} </p>
            </small>
          </div>
          <div className="productdetalis__rightCartQtyButtons">
            <button onClick={updateToBasketAdd} disabled={qty > 5}>
              +
            </button>

            <button onClick={updateToBasketSub} disabled={qty == 1}>
              -
            </button>
          </div>
        </div>
        <button onClick={removeFromBasket}>Remove from Bsaket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
