import { Fragment, useState } from "react";
import { Col , Button} from "react-bootstrap";
import Link from "next/link";
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch, IoIosCart } from "react-icons/io";
import { Tooltip } from "react-tippy";
import axios from 'axios';
import { useToasts } from "react-toast-notifications";

const ProductGridList = ({
  product,
  discount,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  bottomSpace,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  cartItems
}) => {
  const { addToast } = useToasts();
  async function productCart(product) {
    var apiBaseUrl = `http://localhost:4000/cart/userCart`;
    var token = localStorage.getItem("userId");
    var cartItem = [];
     cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
    console.log("The token is", token);
    var headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization : token
    }
    console.log("Product Id coming in is", product._id);
    var data = {
      "supplierId" : localStorage.getItem("supplierId"),
      "supplierCategoryId" : product.supplierCategoryId,
      "supplierProductId" : product._id,
      "categoryName" : product.categoryName,
      "productName" : product.productName,
      "description" : product.description,
      "sellingPrice" : product.sellingPrice,
      "originalPrice" : product.originalPrice,
      "quantity" : 1,
      "imageUrl" : product.imageUrl
    };
    console.log("The data going in is", data);
    axios
    .post(apiBaseUrl, data, {headers : headers} , { validateStatus: false })
    .then((response) => {
      cartItem.push(data);
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
    addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    })
    .catch((err) => {
      addToast("Failed to Add to Cart", { appearance: "error", autoDismiss: true });
    })
  }

  async function productWishlist(product) {
    var apiBaseUrl = `http://localhost:4000/wishlist/userWishlist`;
    var token = localStorage.getItem("userId");
    var headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization : token
    }
    var wishlistItem = [];
     wishlistItem = JSON.parse(localStorage.getItem("wishlistItem")) || [];
    var data = {
      "supplierId" : localStorage.getItem("supplierId"),
      "supplierCategoryId" : product.supplierCategoryId,
      "supplierProductId" : product._id,
      "categoryName" : product.categoryName,
      "productName" : product.productName,
      "description" : product.description,
      "sellingPrice" : product.sellingPrice,
      "originalPrice" : product.originalPrice,
      "quantity" : 1,
      "imageUrl" : product.imageUrl
    };
      
    
    axios
    .post(apiBaseUrl, data, {headers : headers} , { validateStatus: false })
    .then((response) => {
      wishlistItem.push(data);
    localStorage.setItem('wishlistItem', JSON.stringify(wishlistItem));
    addToast("Added To Wishlist", { appearance: "success", autoDismiss: true });
    })
    .catch((err) => {
      addToast("Failed to Add to Wishlist", { appearance: "error", autoDismiss: true });
    })
  }


  return (
    <Fragment>
      <Col lg={3} md={6} className={bottomSpace ? bottomSpace : ""}>
        <div className="product-grid">
          {/*=======  single product image  =======*/}
          <div className="product-grid__image">
            <img
              src={product.imageUrl ? product.imageUrl : "/assets/images/product/product_thumbnail.jpg"}
              className="img-fluid"
              alt={product.name}
            />
            <a className="image-wrap">
              {product.imageUrl.length > 1 ? (
                <img
                  src={product.imageUrl}
                  className="img-fluid"
                  alt={product.productName}
                />
              ) : (
                ""
              )}
            </a>
            <div className="product-grid__floating-badges">
              {discount && discount > 0 ? (
                <span className="onsale">-{discount}%</span>
              ) : (
                ""
              )}
              <span className="hot">New</span>
            </div>
            <div className="product-grid__floating-icons">
              {/* add to wishlist */}
              <Tooltip
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                position="left"
                trigger="mouseenter"
                animation="shift"
                arrow={true}
                duration={200}
              >
               
              </Tooltip>

              {/* add to compare */}

              {/* quick view */}
            </div>
          </div>

          {/*=======  single product content  =======*/}
          <div className="product-grid__content">
            <div className="title">
              <h3>
                <a>{product.productName}</a>
              </h3>
              {/* add to cart */}
              
            </div>
            <div className="product-grid__floating-icons">
              {/* add to wishlist */}
              <Tooltip
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                position="left"
                trigger="mouseenter"
                animation="shift"
                arrow={true}
                duration={200}
              >
                <button
                  onClick={
                    (event) => {
                      event.preventDefault();
                      productWishlist(product);
                    }
                      
                  }
                  className={wishlistItem !== undefined ? "active" : ""}
                >
                  <IoIosHeartEmpty />
                </button>
              </Tooltip>
              </div>
            
            <div className="price">
              {discount > 0  ? (
                <Fragment>
                  <span className="main-price discounted">&#8377;{productPrice}</span>
                  <span className="discounted-price">&#8377;{discountedPrice}</span>
                </Fragment>
              ) : (
                <span className="main-price">&#8377;{productPrice}</span>
              )}
            </div>
            <br />
            <div className="">
            <Button
            onClick={(event) => {
              event.preventDefault();
              productCart(product)}}
                >
                  <IoIosCart /> Add To Cart
                </Button>
              
            </div>
          </div>
        </div>
      </Col>
      {/* product modal */}
    </Fragment>
  );
};

export default ProductGridList;
