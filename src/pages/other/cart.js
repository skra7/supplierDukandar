import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { IoIosClose, IoMdCart } from "react-icons/io";
import axios from 'axios';
const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  let cartTotalPrice = 0;

  useEffect(() => {
    setInterval(() => {
      setCartData(JSON.parse(localStorage.getItem("cartItem")) || []);
    }, 1000);
    
    document.querySelector("body").classList.remove("overflow-hidden");
  },[]);

  const cartValue = (value, product, index) => {
    var headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };
    var data = {
      "supplierProductId" : product.supplierProductId,
      "value" : value
    };
    var apiBaseUrl = `http://localhost:4000/cart/updateCartQuantity`

    axios
    .post(apiBaseUrl, data, {headers : headers} , { validateStatus: false })
    .then((response) => {
      cartData[index].quantity = cartData[index].quantity + value;
    localStorage.setItem('cartItem', JSON.stringify(cartData));
      
    })
    .catch((err) => {
      console.log("Error coming in is",err);
    })

  }

  const deleteFromCart = (product, index) => {
    var token = localStorage.getItem("userId");
      var headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization : token
      }
    var data = {
      "supplierProductId" : product.supplierProductId 
    }
    var apiBaseUrl = "http://localhost:4000/cart/deleteuserCart"
    axios
    .post(apiBaseUrl, data, {headers : headers} , { validateStatus: false })
    .then((response) => {
      cartData.splice(index,1);
    localStorage.setItem('cartItem', JSON.stringify(cartData));
    addToast("Deleted from Cart", { appearance: "warning", autoDismiss: true });
    })
    .catch((err) => {
      addToast("Failed to Delete from Cart", { appearance: "error", autoDismiss: true });
    })
  }

  
  const deleteAllFromCart = () => {
    var token = localStorage.getItem("userId");
      var headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization : token
      }
   
    var apiBaseUrl = "http://localhost:4000/cart/deleteallfromCart"
    axios
    .post(apiBaseUrl,  {headers : headers} , { validateStatus: false })
    .then((response) => {
     localStorage.removeItem("cartItem");
    addToast("Deleted everything from Cart", { appearance: "warning", autoDismiss: true });
    })
    .catch((err) => {
      addToast("Failed to Delete from Cart", { appearance: "error", autoDismiss: true });
    })
  }

  const proceedCheckout = () => {
    localStorage.removeItem("cartItem");
    let string = window.location.origin + `/`;
            window.open(string, "_self");
  }

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Cart"
        backgroundImage="/assets/images/backgrounds/cartbg.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Cart</li>
        </ul>
      </BreadcrumbOne>

      {/* cart content */}
      <div className="cart-content space-mt--r130 space-mb--r130">
        <Container>
          {cartData && cartData.length >= 1 ? (
            <Row>
              <Col lg={12}>
                {/* cart table */}
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th className="product-name" colSpan="2">
                        Product
                      </th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Total</th>
                      <th className="product-remove">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.map((product, i) => {
                      const discountedPrice = parseFloat(product.sellingPrice).toFixed(2);

                      cartTotalPrice += discountedPrice * parseInt(product.quantity);
                      return (
                        <tr key={i}>
                          <td className="product-thumbnail">
                            
                              <a>
                                <img
                                  src={
                                    product.imageUrl ? product.imageUrl : "/assets/images/product/product_thumbnail.jpg"
                                  }
                                  className="img-fluid"
                                  alt=""
                                />
                              </a>
                          </td>
                          <td className="product-name">
                              <a>{product.productName}</a>
                          </td>

                          <td className="product-price">
                            <span className="price">&#8377;{discountedPrice}</span>
                          </td>

                          <td className="product-quantity">
                            <div className="cart-plus-minus">
                              <button
                                className="dec qtybutton"
                                onClick={(event) =>{
                                  event.preventDefault();
                                  cartValue(-1, product , i);
                                }
                                  
                                }
                              >
                                -
                              </button>
                              <input
                                className="cart-plus-minus-box"
                                type="text"
                                value={product.quantity}
                                readOnly
                              />
                              <button
                                className="inc qtybutton"
                                onClick={() => {
                                  event.preventDefault();
                                  cartValue(1, product , i);
                                }
                                }
                              
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td className="total-price">
                            <span className="price">
                              &#8377;{(discountedPrice * parseInt(product.quantity)).toFixed(2)}
                            </span>
                          </td>

                          <td className="product-remove">
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                deleteFromCart(product , i);
                              }}
                            >
                              <IoIosClose />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Col>
              <Col lg={12} className="space-mb--r100">
                <div className="cart-coupon-area space-pt--30 space-pb--30">
                  <Row className="align-items-center">
                    <Col lg={7} className="space-mb-mobile-only--30">
                      <div className="lezada-form coupon-form">
                        {/* <form>
                          <Row>
                            <Col md={7}>
                              <input
                                type="text"
                                placeholder="Enter your coupon code"
                              />
                            </Col>
                            <Col md={5}>
                              <button className="lezada-button lezada-button--medium">
                                apply coupon
                              </button>
                            </Col>
                          </Row>
                        </form> */}
                      </div>
                    </Col>
                    <Col lg={5} className="text-left text-lg-right">
                      <button
                        className="lezada-button lezada-button--medium"
                        onClick={(event) => {
                          event.preventDefault();
                          deleteAllFromCart();
                        }}
                      >
                        clear cart
                      </button>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={5} className="ml-auto">
                <div className="cart-calculation-area">
                  <h2 className="space-mb--40">Cart totals</h2>
                  <table className="cart-calculation-table space-mb--40">
                    <tbody>
                      <tr>
                        <th>SUBTOTAL</th>
                        <td className="subtotal">
                          &#8377;{cartTotalPrice.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <th>TOTAL</th>
                        <td className="total">&#8377;{cartTotalPrice.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="cart-calculation-button text-center">
                      <button 
                      onClick={(event) => {
                        event.preventDefault();
                        proceedCheckout();
                      }}
                      className="lezada-button lezada-button--medium">
                        proceed to checkout
                      </button>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoMdCart />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">No items found in cart</p>
                    <Link
                      href="/shop/left-sidebar"
                      as={process.env.PUBLIC_URL + "/"}
                    >
                      <a className="lezada-button lezada-button--medium">
                        Shop Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </LayoutTwo>
  );
};


export default Cart;
