import { Fragment, useState, useEffect } from "react";
import { Col , Button, Badge} from "react-bootstrap";
import Link from "next/link";
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch, IoIosCart } from "react-icons/io";
import { Tooltip } from "react-tippy";
import axios from 'axios';
import { useToasts } from "react-toast-notifications";
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';

const ProductActualList = ({
  product,
  discountedPrice,
  discount,
  productPrice,
  filteredCart
}) => {
    
  const productData = product;
  const router = useRouter(); 
  const { addToast } = useToasts();
  async function productCart(product) {
    var cartItem = [];
     cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
    let obj = cartItem.find(x => x.supplierProductId === product._id);
    if(obj) {
      let index = cartItem.indexOf(obj);
      cartItem[index].quantity = cartItem[index].quantity + 1;
      localStorage.setItem('cartItem', JSON.stringify(cartItem));
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
    else{
      var data = {
        "supplierId" : localStorage.getItem("supplierId"),
        "supplierCategoryId" : product.supplierCategoryId,
        "supplierProductId" : product._id,
        "categoryName" : product.categoryName,
        "productName" : product.productName,
        "description" : product.description,
        "sellingPrice" : product.sellingPrice,
        "originalPrice" : product.originalPrice,
        "unit" : product.unit,
        "quantity" : 1,
        "imageUrl" : product.imageUrl
      };
      cartItem.push(data);
      localStorage.setItem('cartItem', JSON.stringify(cartItem));
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
   
  }

  const cartValue = (value, product, filteredCart) => {
    var cartItem = [];
    cartItem = JSON.parse(localStorage.getItem("cartItem"))|| [];
    filteredCart.quantity = filteredCart.quantity + value;
    if(filteredCart.quantity <= 0) {
      let index2 = cartItem.indexOf(filteredCart);
    cartItem.splice(index2, 1);
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
    } else {
      let index2 = cartItem.indexOf(filteredCart);
    cartItem.splice(index2, 1, filteredCart);
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
    }
    
  }
      
          
          
  return (
    <Fragment>
      
     <div className="single-cart-product" key={product._id}>
         <div className = "image">
         <div className="image__floating-badges">
           <Badge variant="info">
              {discount && discount > 0 ? (
                <span className="onsale">-{discount}%</span>
              ) : (
                ""
              )}
             </Badge>
            </div>
            <img
              src={product.imageUrl ? product.imageUrl.split(',')[0] : "/icon.jpg"}
              className="img-fluid"
              style={{width : "200px", height : "100px"}}
              alt={product.name}
              onClick={(event) => {
                event.preventDefault();
                router.push(`/shop/product-fullwidth/${product._id}`)
              }}
            />
            
            </div>
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
            {/* <div className="product-grid__floating-badges">
              {discount && discount > 0 ? (
                <span className="onsale">-{discount}%</span>
              ) : (
                ""
              )}
              <span className="hot">New</span>
            </div> */}
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
         

          {/*=======  single product content  =======*/}
          <div className="product-grid__content">
            <div className="title">
              <h3>
                <a onClick={(event) => {
                  event.preventDefault();
                  router.push(`/shop/product-fullwidth/${product._id}`)
                }}
                 >
                    <Box fontWeight="fontWeightBold" style={{ color : "#31de79"}}>
                    {product.productName}
                    </Box>
                    </a>
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
                  <span className="unit">/ {product.unit}</span>
                </Fragment>
              ) : (
                <Fragment>
                <span className="main-price">&#8377;{discountedPrice}</span>
                <span className="unit">/ {product.unit}</span>
                </Fragment>
              )}
            </div>
            <br />
            <div className="">
              
             {filteredCart.length > 0 && filteredCart[0].quantity > 0 ?
                  <table style={{border : "none"}} className="cart-table">
                  <td className="product-quantity">
                  <div className="cart-plus-minus">
                  <button
                    className="dec qtybutton"
                    onClick={(event) =>{
                      event.preventDefault();
                      cartValue(-1, product , filteredCart[0]);
                    }
                      
                    }
                  >
                    -
                  </button>
                  <input
                    className="cart-plus-minus-box"
                    type="text"
                    value={filteredCart[0].quantity}
                    readOnly
                  />
                  <button
                    className="inc qtybutton"
                    onClick={() => {
                      event.preventDefault();
                      cartValue(1, product , filteredCart[0]);
                    }
                    }
                  
                  >
                    +
                  </button>
                </div>
                </td>
                </table>
              :
              <Button
              onClick={(event) => {
                event.preventDefault();
                productCart(product)}}
                style={{backgroundColor : "#31de79"}}
                  >
                    <IoIosCart /> Add To Cart
                  </Button>
            }
            {/* <Button
            onClick={(event) => {
              event.preventDefault();
              productCart(product)}}
              style={{backgroundColor : "#31de79"}}
                >
                  <IoIosCart /> Add To Cart
                </Button> */}
              
            </div>
         </div>
         </div>
      {/* product modal */}
    </Fragment>
  );

 
};

export default ProductActualList;
