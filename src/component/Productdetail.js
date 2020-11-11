import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Productdetail.css";
import Swal from "sweetalert2";
import { useStateValue } from "../context/StateProvider";

function Productdetail() {
  const { state } = useLocation();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [[selectedProductImage], setSelectedProductImage] = useState("");
  const [addCart, setAddCart] = useState(0);
  const [selectedId, setSelectedId] = useState(1);
  const [addedStatus, setAddedStatus] = useState(Boolean);
  const [qty, setQty] = useState(1);
  const [{ basket }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);

  const addItemWithStatus = () => {
    setAddCart(1);
    addToBasket();
    Swal.fire({
      position: "top-end",
      icon: "success",
      customClass: "swal-wide",
      title: selectedProduct.title,
      text: "Sucessfully Added",

      imageUrl: selectedProduct.image,
      imageWidth: 40,
      imageHeight: 40,
      showConfirmButton: false,
      showCloseButton: true,

      timer: 2500,
    });
  };
  const addToBasket = async () => {
    await setAddCart(selectedProduct.id);
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: selectedProduct.id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        category: selectedProduct.category,
        description: selectedProduct.description,
        image: selectedProduct.image,
        qty: qty,
      },
    });
  };
  const handleChangeQtyAdd = () => {
    setQty(qty + 1);
  };
  const handleChangeQtySub = () => {
    setQty(qty - 1);
  };

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${state}`
      );

      const jsonResponse = await response.json();

      setSelectedProduct(jsonResponse);
      setSelectedProductImage(jsonResponse.image);
    };

    getProducts();
    setLoading(false);
  }, []);

  const showImage = () => {
    setSelectedProductImage(selectedProduct.image);
    setSelectedId(1);
  };

  const status = basket?.some((o) => o.id === selectedProduct.id);

  return (
    <div className="productdetalis">
      <div className="productdetalis__left">
        <div className="productdetalis__leftList">
          <img
            className="productdetalis__leftImage"
            src={selectedProduct.image}
            alt=""
          />
        </div>
        <div className="productdetalis__leftdivImagePriview">
          <div
            className="productdetalis__leftDivImagePriviewDiv"
            style={
              selectedId == 1
                ? {
                    border: "2px solid",
                    borderColor: "#3f2be4",
                    borderRadius: "20px",
                  }
                : {}
            }
          >
            <img
              onClick={showImage}
              className="productdetalis__leftdivImagePriviewImage"
              src={selectedProduct.image}
              alt=""
            />
          </div>
          <div
            className="productdetalis__leftDivImagePriviewDiv"
            style={
              selectedId == 2
                ? {
                    border: "2px solid",
                    borderColor: "#3f2be4",
                    borderRadius: "20px",
                  }
                : {}
            }
          >
            <img
              onClick={() => setSelectedId(2)}
              className="productdetalis__leftdivImagePriviewImage"
              src={selectedProduct.image}
              alt=""
            />
          </div>

          <div
            className="productdetalis__leftDivImagePriviewDiv"
            style={
              selectedId == 3
                ? {
                    border: "2px solid",
                    borderColor: "#3f2be4",
                    borderRadius: "20px",
                  }
                : {}
            }
          >
            <img
              onClick={() => setSelectedId(3)}
              className="productdetalis__leftdivImagePriviewImage"
              src={selectedProduct.image}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="productdetalis__right">
        <div className="productdetalis__rightTitle">
          <h1>{selectedProduct.title}</h1>
          {Array(Math.floor(Math.random() * 5) + 1)
            .fill()
            .map((_, i) => (
              <span className="productdetalis__rating">★</span>
            ))}
          <p>
            <span>category </span>
            {selectedProduct.category}{" "}
          </p>
        </div>

        <div className="productdetalis__rightPriceSection">
          <div className="productdetalis__rightPrice">
            <p>
              <span>&nbsp; $ &nbsp;</span>
              {selectedProduct.price}
            </p>
          </div>
          <div className="productdetalis__rightOffer">
            <p id="offer">Save {Math.floor(Math.random() * 20) + 1}%</p>
            <p id="taxes">Inclusive of all Taxes and GST</p>
          </div>
        </div>

        <div className="productdetalis__rightDiscription">
          <div id="taxes">{selectedProduct.description}</div>
        </div>
        <div className="productdetalis__rightCart">
          {status != true ? (
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
                <button onClick={handleChangeQtyAdd} disabled={qty > 5}>
                  +
                </button>

                <button onClick={handleChangeQtySub} disabled={qty == 1}>
                  -
                </button>
              </div>
            </div>
          ) : (
            <span></span>
          )}

          <div className="productdetalis__rightCartAdd">
            {status == true ? (
              <Link
                to="/checkout"
                style={{ textDecoration: "none", fontSize: "12px" }}
              >
                <div className="productdetalis__rightCartAddButton">
                  Goo to cart{" "}
                  <p>
                    <small>Item is present in cart</small>
                  </p>
                </div>
              </Link>
            ) : (
              <div
                className="productdetalis__rightCartAddButton"
                onClick={addItemWithStatus}
              >
                Add To Cart
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Productdetail;
