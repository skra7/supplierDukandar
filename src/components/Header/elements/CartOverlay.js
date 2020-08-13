import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import CustomScroll from "react-custom-scroll";
import { useToasts } from "react-toast-notifications";
import React from 'react';
import axios from 'axios';

const CartOverlay = ({ cartData, activeStatus, getActiveStatus}) => {
  
  
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const deleteFromCart = (product, index) => {
      cartData.splice(index,1);
    localStorage.setItem('cartItem', JSON.stringify(cartData));
    addToast("Deleted from Cart", { appearance: "warning", autoDismiss: true });
    
  }
  return (
    <div className={`cart-overlay ${activeStatus ? "active" : ""}`}>
      <div
        className="cart-overlay__close"
        onClick={() => {
          getActiveStatus(false);
          document.querySelector("body").classList.remove("overflow-hidden");
        }}
      />
      <div className="cart-overlay__content">
        {/*=======  close icon  =======*/}
        <button
          className="cart-overlay__close-icon"
          onClick={() => {
            getActiveStatus(false);
            document.querySelector("body").classList.remove("overflow-hidden");
          }}
        >
          <IoIosClose />
        </button>
        {/*=======  offcanvas cart content container  =======*/}
        <div className="cart-overlay__content-container">
          <h3 className="cart-title">Cart</h3>
          {cartData.length >= 1 ? (
            <div className="cart-product-wrapper">
              <div className="cart-product-container">
                <CustomScroll allowOuterScroll={true}>
                  {cartData.map((product, i) => {
                    const discountedPrice = parseFloat(product.sellingPrice).toFixed(2);

                    cartTotalPrice += discountedPrice * product.quantity;

                    return (
                      <div className="single-cart-product" key={i}>
                        <span className="cart-close-icon">
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteFromCart(product, i);
                            }}
                          >
                            <IoIosClose />
                          </button>
                        </span>
                        <div className="image">
                            <a>
                              <img
                                src={
                                  product.imageUrl ? product.imageUrl : "/assets/images/product/product_thumbnail.jpg"
                                }
                                className="img-fluid"
                                alt=""
                              />
                            </a>
                        </div>
                        <div className="content">
                          <h5>
                              <a>{product.productName}</a>
                          </h5>
                          <p>
                            <span className="cart-count">
                              {product.quantity} x{" "}
                            </span>{" "}
                            <span className="discounted-price">
                            &#8377;{discountedPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CustomScroll>
              </div>
              {/*=======  subtotal calculation  =======*/}
              <p className="cart-subtotal">
                <span className="subtotal-title">Subtotal:</span>
                <span className="subtotal-amount">
                &#8377;{cartTotalPrice.toFixed(2)}
                </span>
              </p>
              {/*=======  cart buttons  =======*/}
              <div className="cart-buttons">
                <Link
                  href="/other/cart"
                  as={process.env.PUBLIC_URL + "/other/cart"}
                >
                  <a>view cart</a>
                </Link>
                {/* <Link
                  href="/other/checkout"
                  as={process.env.PUBLIC_URL + "/other/checkout"}
                >
                  <a>checkout</a>
                </Link> */}
              </div>
              {/*=======  free shipping text  =======*/}
              <p className="free-shipping-text">
                Free Shipping on All Orders
              </p>
            </div>
          ) : (
            "No items found in cart"
          )}
        </div>
      </div>
    </div>
  );
};


export default CartOverlay;
