import { Fragment, useState, useEffect } from "react";
import { Col , Button} from "react-bootstrap";
import Link from "next/link";
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch, IoIosCart } from "react-icons/io";
import { Tooltip } from "react-tippy";
import axios from 'axios';
import { useToasts } from "react-toast-notifications";
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';


const ProductDescription = ({
  product,
  discountedPrice,
  discount,
  productPrice,
  filteredCart
}) => {

  
 
  
  const router = useRouter(); 
  const { addToast } = useToasts();
  const [index, setIndex] = useState(false);
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
      setIndex(true);
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
     <div className="product-content" key={product._id}>
     <h2 className="product-content__title space-mb--20">{product.productName}</h2>
     <h4 className="product-content__description space-mb--20">{product.description}</h4>
      <div className="product-content__price space-mb--20">
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
            
            
            <br />
            

            <div className="">
            {filteredCart.length > 0 && filteredCart[0].quantity > 0 ?
                  <table style={{border : "none"}} className="cart-table">
                    <tr>
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
                </tr>
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
            </div>
         
            
         </div>
        
      {/* product modal */}
    </Fragment>
  );

  };

export default ProductDescription;
