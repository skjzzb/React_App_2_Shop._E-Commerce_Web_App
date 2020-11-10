import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";

import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../context/StateProvider";

function Checkout() {
  const [{ basket }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <div>
          <h2 className="checkout__title">Your Basket</h2>
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              price={item.price}
              category={item.category}
              description={item.category}
              image={item.image}
              qty={item.qty}
            />
          ))}
          <p>
            <br></br>

            {basket.length == 0 ? (
              <h1> Basket is empty add some products</h1>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
