import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import OtpInput from 'react-otp-input';
import React from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { useToasts } from "react-toast-notifications";

const LoginRegister = (props) => {
  const [OTPenabled , setOTPenabled] = React.useState(false);
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [username, setuserName] = React.useState("");
  const router = useRouter();
  const { name } = router.query || '';

  const handleMobileChange = (event) => {
    setMobileNumber(event.target.value);
  }

  
  const handleNameChange = (event) => {
    setuserName(event.target.value);
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

    
  const submit = (event) => {
    
    
    event.preventDefault();
    var supplierId = localStorage.getItem("supplierId");
    localStorage.setItem("mobileNumber", mobileNumber);
    localStorage.setItem("username", username);
    localStorage.setItem("login", true);
         // console.log("Response data in verify is", response.data.data._id);
          if(name === 'fromCheckout') {
            router.push('/other/cart');
          }
          else {
            let string = window.location.origin + `/Home/${supplierId}`;
            window.open(string, "_self");
          }
          
    // setOTPenabled(false);
  }
  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Welcome Back"
        backgroundImage="/assets/images/backgrounds/cartbg.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>
          <li>Customer Login</li>
        </ul>
      </BreadcrumbOne>
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
                        <h2 className="space-mb--20">Login</h2>
                        <p>Great to have you back!</p>
                      </div>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                    <label>Mobile Number</label>
                      <input
                        type="text"
                        value={mobileNumber}
                        onChange={handleMobileChange}
                        placeholder="Enter here"
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
                   
                    <Col lg={12} className="space-mb--30">
                      <button className="lezada-button lezada-button--medium" onClick={submit}>
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
    </LayoutTwo>
  );
};



const OTPcontainer = (props) => (
  <Col lg={12} className="space-mb--60">
  <OtpInput
value={props.OTP}
inputStyle={{  
  width: '3rem',  
  height: '3rem',  
  margin: '20px 1rem',  
  fontSize: '2rem',  
  borderRadius: 4,  
  border: '2px solid rgba(0,0,0,0.3)',  
}} 
onChange={props.setOTP}
autoFocus
numInputs={4}
seperator={<grid>-</grid>}
type="number"
/>
{/* // <ResendOTP handelResendClick={() => console.log("Resend clicked")} /> */}
</Col>
)

export default LoginRegister;
