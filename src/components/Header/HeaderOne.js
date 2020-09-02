import { useState, useEffect, Fragment } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { connect } from "react-redux";
import {
  IoIosSearch,
  IoMdPerson,
  IoIosHeartEmpty,
  IoIosCart,
  IoIosMenu,
  IoIosPower,
  IoLogoWhatsapp,
  IoMdMail,
} from "react-icons/io";
import { IconContext } from "react-icons";
import Navigation from "./elements/Navigation";
// import AboutOverlay from "./elements/AboutOverlay";
// import SearchOverlay from "./elements/SearchOverlay";
import CartOverlay from "./elements/CartOverlay";
// import WishlistOverlay from "./elements/WishlistOverlay";
import MobileMenu from "./elements/MobileMenu";
import Button from "react-bootstrap/Button";
import { useMediaQuery } from "react-responsive";

const HeaderOne = ({ aboutOverlay }) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [offCanvasAboutActive, setOffCanvasAboutActive] = useState(false);
  const [offCanvasSearchActive, setOffCanvasSearchActive] = useState(false);
  const [offCanvasCartActive, setOffCanvasCartActive] = useState(false);
  const [offCanvasWishlistActive, setOffCanvasWishlistActive] = useState(false);
  const [offCanvasMobileMenuActive, setOffCanvasMobileMenuActive] = useState(
    false
  );
  const [mobileView, setMobileView] = useState(false);
  const [cartData, setCartData] = useState([]);

  const [cartItem, setCartItem] = useState([]);

  const [loginFlag, setLoginFlag] = React.useState(true);

  const [supplierNumber, setSupplierNumber] = React.useState("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [supplierBusiness, setSupplierBusiness] = React.useState("");

  useEffect(() => {
    const header = document.querySelector("header");
    setHeaderTop(header.offsetTop);
    setHeaderHeight(header.offsetHeight);

    const interval = setInterval(() => {
      var cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
      var cartSupplier = localStorage.getItem("supplierId") || "";
      var cartFinal = cartItem.filter(
        (cart) => cart.supplierId === cartSupplier
      );
      setCartData(cartFinal);
      var sellerInfo = JSON.parse(localStorage.getItem("sellerInfo"));
      if (sellerInfo) {
        var supplierData = JSON.parse(
          localStorage.getItem("supplierBusinessDetails")
        );
        if (sellerInfo.shopName) {
          setSupplierBusiness(sellerInfo.shopName);
        } else {
          setSupplierBusiness(supplierData.businessName);
        }
        setSupplierNumber(sellerInfo.phoneNumber);
      } else {
        var supplierData = JSON.parse(
          localStorage.getItem("supplierBusinessDetails")
        );
        setSupplierBusiness(supplierData.businessName);
        setSupplierNumber(localStorage.getItem("supplierNumber") || "");
      }
    }, 1000);
    if (localStorage.getItem("userId")) {
      setLoginFlag(false);
    } else {
      setLoginFlag(true);
    }

    window.addEventListener("scroll", handleScroll);

    document.body.style.paddingTop = 0;
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleLogin = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    let string = window.location.origin + "/";
    window.open(string, "_self");
  };

  return (
    <Fragment>
      <header
        className={`topbar-shadow ${scroll > headerTop ? "is-sticky" : ""}`}
        style={
          isTabletOrMobile ? { background: "black" } : { background: "white" }
        }
      >
        <Container className="wide">
          <div className="header-content d-flex align-items-center justify-content-between position-relative space-py-mobile-only--30">
            {/* logo */}
            <div className="header-content__logo d-flex align-items-center space-pr--15">
              <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                <a>
                  <h4
                    style={
                      isTabletOrMobile ? { color: "white" } : { color: "black" }
                    }
                  >
                    <strong>
                      {supplierBusiness.split(" ")[0]}{" "}
                      <span style={{ color: "#31de79" }}>
                        {supplierBusiness.split(" ").slice(1)}
                      </span>
                    </strong>
                  </h4>
                </a>
              </Link>
            </div>

            {/* navigation */}
            <Navigation />

            {/* icons */}
            <div className="header-content__icons space-pl--15">
              <ul className="d-none d-lg-block">
                {/* <li>
                  <button
                    onClick={() => {
                      setOffCanvasWishlistActive(true);
                      document
                        .querySelector("body")
                        .classList.add("overflow-hidden");
                    }}
                  >
                    <IoIosHeartEmpty /> */}
                {/* {wishlistItems.length >= 1 ? (
                      <span className="count">
                        {wishlistItems.length ? wishlistItems.length : ""}
                      </span>
                    ) : (
                      ""
                    )} */}
                {/* </button>
                </li> */}
                <li style={{ color: "white" }}>
                  <a
                    href={`https://api.whatsapp.com/send?phone=91${supplierNumber}`}
                    target="_blank"
                  >
                    <IoLogoWhatsapp size={30} style={{ fill: "#4FCE5D" }} />
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setOffCanvasCartActive(true);
                      document
                        .querySelector("body")
                        .classList.add("overflow-hidden");
                    }}
                    style={
                      isTabletOrMobile ? { color: "white" } : { color: "black" }
                    }
                  >
                    <IoIosCart />
                    {cartData.length >= 1 ? (
                      <span className="count">
                        {cartData.length ? cartData.length : ""}
                      </span>
                    ) : (
                      ""
                    )}
                  </button>
                </li>
              </ul>

              <ul className="d-block d-lg-none">
                <li>
                  <a
                    href={`https://api.whatsapp.com/send?phone=91${supplierNumber}`}
                    target="_blank"
                  >
                    <IoLogoWhatsapp size={30} style={{ fill: "#4FCE5D" }} />
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setOffCanvasCartActive(true);
                      document
                        .querySelector("body")
                        .classList.add("overflow-hidden");
                    }}
                    style={
                      isTabletOrMobile ? { color: "white" } : { color: "black" }
                    }
                  >
                    <IoIosCart
                      style={
                        isTabletOrMobile ? { fill: "white" } : { fill: "black" }
                      }
                    />
                    {cartData.length >= 1 ? (
                      <span className="count">
                        {cartData.length ? cartData.length : ""}
                      </span>
                    ) : (
                      ""
                    )}
                  </button>
                </li>

                {/* <li>
                  <button  onClick={() => setOffCanvasMobileMenuActive(true)}>
                    <IoIosMenu style={{ fill : "white"}}/>
                  </button>
                </li> */}
              </ul>
            </div>
          </div>
        </Container>
      </header>

      {/* about overlay */}
      {/* {aboutOverlay === false ? (
        ""
      ) : (
        <AboutOverlay
          activeStatus={offCanvasAboutActive}
          getActiveStatus={setOffCanvasAboutActive}
        />
      )} */}
      {/* search overlay */}
      {/* <SearchOverlay
        activeStatus={offCanvasSearchActive}
        getActiveStatus={setOffCanvasSearchActive}
      /> */}

      {/* cart overlay */}
      <CartOverlay
        cartData={cartData}
        activeStatus={offCanvasCartActive}
        getActiveStatus={setOffCanvasCartActive}
      />

      {/* wishlist overlay */}
      {/* <WishlistOverlay
        activeStatus={offCanvasWishlistActive}
        getActiveStatus={setOffCanvasWishlistActive}
      /> */}
      {/* Mobile Menu */}
      <MobileMenu
        activeStatus={offCanvasMobileMenuActive}
        getActiveStatus={setOffCanvasMobileMenuActive}
      />
    </Fragment>
  );
};

export default HeaderOne;
