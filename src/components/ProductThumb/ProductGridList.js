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
    var cartItem = [];
     cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
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
    cartItem.push(data);
    console.log("The data going in is", data);
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
    addToast("Added To Cart", { appearance: "success", autoDismiss: true });
  }

  // async function productWishlist(product) {
  //   var apiBaseUrl = `http://3.7.238.54:4000/wishlist/userWishlist`;
  //   var token = localStorage.getItem("userId");
  //   var headers = {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization : token
  //   }
  //   var wishlistItem = [];
  //    wishlistItem = JSON.parse(localStorage.getItem("wishlistItem")) || [];
  //   var data = {
  //     "supplierId" : localStorage.getItem("supplierId"),
  //     "supplierCategoryId" : product.supplierCategoryId,
  //     "supplierProductId" : product._id,
  //     "categoryName" : product.categoryName,
  //     "productName" : product.productName,
  //     "description" : product.description,
  //     "sellingPrice" : product.sellingPrice,
  //     "originalPrice" : product.originalPrice,
  //     "quantity" : 1,
  //     "imageUrl" : product.imageUrl
  //   };
      
    
  //   axios
  //   .post(apiBaseUrl, data, {headers : headers} , { validateStatus: false })
  //   .then((response) => {
  //     wishlistItem.push(data);
  //   localStorage.setItem('wishlistItem', JSON.stringify(wishlistItem));
  //   addToast("Added To Wishlist", { appearance: "success", autoDismiss: true });
  //   })
  //   .catch((err) => {
  //     addToast("Failed to Add to Wishlist", { appearance: "error", autoDismiss: true });
  //   })
  // }


  return (
    <Fragment>
      <Col lg={3} md={6} className={bottomSpace ? bottomSpace : ""}>
        <div className="product-grid">
          {/*=======  single product image  =======*/}
          <div className="product-grid__image">
            <img
              src={product.imageUrl ? product.imageUrl : "/assets/images/product/product_thumbnail.jpg"}
              className="img-fluid"
              width="200"
              height="50"
              alt={product.name}
            />
            {/* <a className="image-wrap">
              {product.imageUrl.length > 1 ? (
                <img
                  src={product.imageUrl}
                  className="img-fluid"
                  alt={product.productName}
                />
              ) : (
                ""
              )}
            </a> */}
            <div className="product-grid__floating-badges">
              {discount && discount > 0 ? (
                <span className="onsale">-{discount}%</span>
              ) : (
                ""
              )}
              <span className="hot">New</span>
            </div>
            {/* <div className="product-grid__floating-icons">

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

              

              
            </div> */}
          </div>

          {/*=======  single product content  =======*/}
          <div className="product-grid__content">
            <div className="title">
              <h3>
                <a>{product.productName}</a>
              </h3>
              {/* add to cart */}
              
            </div>
            {/* <div className="product-grid__floating-icons">
             
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
              </div> */}
            
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
