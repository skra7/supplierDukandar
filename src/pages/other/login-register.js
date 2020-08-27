import Link from "next/link";
import { Container, Row, Col ,Modal, Spinner} from "react-bootstrap";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import OtpInput from 'react-otp-input';
import React from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { useToasts } from "react-toast-notifications";
import { useState, useEffect} from 'react';

const LoginRegister = (props) => {
  const [OTPenabled , setOTPenabled] = React.useState(false);
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [username, setuserName] = React.useState("");
  const [fullAddress , setFullAddress] = React.useState("");
  const router = useRouter();
  const [show , setShow] = useState(false);
  const [cartData, setCartData] = useState([]);
  const { name } = router.query || '';
  const { addToast } = useToasts();

  useEffect(() => {
    setInterval(() => {
      var cartItem = [];
      cartItem = JSON.parse(localStorage.getItem("cartItem"))|| [];
      var cartSupplier = localStorage.getItem("supplierId") || "";
      var cartFinal =  cartItem.filter(cart => cart.supplierId === cartSupplier) ;
      setCartData(cartFinal);
    }, 1000);
    document.querySelector("body").classList.remove("overflow-hidden");
  },[]);

  const handleMobileChange = (event) => {
    setMobileNumber(event.target.value);
  }

  
  const handleClose = () => {
    setShow(false);
  }
  
  const handleModal = () => {
    setshow2(true);
  }

  const handleNameChange = (event) => {
    setuserName(event.target.value);
  }

  const handleAddressChange = (event) => {
    setFullAddress(event.target.value);
  }


  
  async function proceedCheckout() {
    setShow(true);
    let supplierId = localStorage.getItem("supplierId");
    let number = "+91" + mobileNumber;
    var productList = [];
    cartData.map((product) => {
      var name = product.productName;
      var qty = product.quantity;
      var unit = product.unit;
      var price = parseFloat(product.sellingPrice).toFixed(2);
      var imageUrl = product.imageUrl;
      let jsonData = { id : product.supplierProductId, name : name, qty : qty, unit : unit, price : price, imageUrl : imageUrl};
      productList.push(jsonData);
    });
        const headers2 = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        };
        var data = {
          userNumber : number,
          userName : username,
          userAddress : fullAddress,
          sellerId : supplierId,
          productList : productList,
          paidAmount : 0,
          images : [],
          description : "Purchased Online",
          paymentMode : "Cash",
          notes : "Online"
        }
        var apiBaseUrl2 = "http://3.7.238.54:4000/v1/purchaseOrder";
      //const proxyurl = "https://cors-anywhere.herokuapp.com/";
         axios
          .post(apiBaseUrl2,  data , {headers : headers2}, {validateStatus : false})
          .then((response) => {
            var cartItem = [];
            cartItem = JSON.parse(localStorage.getItem("cartItem"))|| [];
            cartData.map((cart) =>{
              let index = cartItem.indexOf(cart);
              cartItem.splice(index , 1);
            });
            localStorage.setItem("cartItem", JSON.stringify(cartItem));
            setShow(false);
            router.push('/other/showCheckout');
            addToast("Cart Checkout Done", { appearance: "success", autoDismiss: true });
          })
          .catch((err) => {
            setShow(false);
            console.log(err);
            addToast("Failed to Checkout", { appearance: "error", autoDismiss: true });
          });
    
   
  }


  // const generateOTP = (event) => {
  //   event.preventDefault();
  //   var apiBaseUrl = "http://api.dukandar.io/RequestOTP"
  //   var data = {
  //     "countryCode" : "+91",
  //     "numberWithOutCountryCode" : mobileNumber
  //   }
  //   var headers = {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   };
  //   axios
  //     .post(apiBaseUrl, data, headers , { validateStatus: false })
  //     .then((response) => {
  //       setOTPenabled(true);
  //         console.log(response);
  //     })
  //     .catch((err) => {
  //         console.log("######", err);
  //     });
  // };

    
  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        page={"details"}
        />
      <div className="login-area space-mt--r100 space-mb--r100">
        <Container>
          <Row>
            <Col lg={2}></Col>
            <Col lg={6} className="space-mb-mobile-only--50">
              <div className="lezada-form login-form">
                <form>
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20">Details</h2>
                        <p>Great to have you back!</p>
                      </div>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                    <label>Mobile Number</label>
                      <input
                        type="text"
                        value={mobileNumber}
                        onChange={handleMobileChange}
                        placeholder="Enter your 10 digit Mobile Number"
                        required
                      />
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <label>Name</label>
                      <input
                        type="text"
                        value={username}
                        onChange={handleNameChange}
                        placeholder="Enter here"
                        required
                      />
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <label>Address</label>
                      <input
                        type="text"
                        value={fullAddress}
                        onChange={handleAddressChange}
                        placeholder="Enter here"
                        required
                      />
                    </Col>
                   
                    <Col lg={12} className="space-mb--30">
                      <button className="lezada-button lezada-button--medium" onClick={(event) => {
                        event.preventDefault();
                        proceedCheckout();}}>
                        Submit
                      </button>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
                     </Row>
        </Container>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Title><span>Please wait while we submit your order....</span>
        <span><Spinner animation="border" variant="success" /></span>
        </Modal.Title>
      </Modal>
    </LayoutTwo>
  );
};



// const OTPcontainer = (props) => (
//   <Col lg={12} className="space-mb--60">
//   <OtpInput
// value={props.OTP}
// inputStyle={{  
//   width: '3rem',  
//   height: '3rem',  
//   margin: '20px 1rem',  
//   fontSize: '2rem',  
//   borderRadius: 4,  
//   border: '2px solid rgba(0,0,0,0.3)',  
// }} 
// onChange={props.setOTP}
// autoFocus
// numInputs={4}
// seperator={<grid>-</grid>}
// type="number"
// />
// {/* // <ResendOTP handelResendClick={() => console.log("Resend clicked")} /> */}
// </Col>
// )

export default LoginRegister;
