import {
  IoIosPhonePortrait,
  IoMdMail,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoPinterest,
  IoMdPerson,
  IoIosPower
} from "react-icons/io";

import Link from "next/link";
import React from 'react';

const MobileMenuWidgets = () => {
  const [ loginFlag, setLoginFlag] = React.useState(true);
  React.useEffect(() => {
    if(localStorage.getItem("userId")) {
      setLoginFlag(false);
    }
    else {
      setLoginFlag(true);
    }
  },[])
  return (
    <div className="offcanvas-mobile-menu__widgets">
      <div className="contact-widget space-mb--30">
        <ul>
            {
              !loginFlag ? 
                (
                <li>
                <IoIosPower />
            <Link
              href="/other/login-register"
              as={process.env.PUBLIC_URL + "/other/login-register"}
            >
              <a>Log Out</a>
            </Link>
            </li>
            )
                  : 
                 ( 
                 <li>
                 <IoMdPerson />
                  <Link
                    href="/other/login-register"
                    as={process.env.PUBLIC_URL + "/other/login-register"}
                  >
                    <a>Login / Register</a>
                  </Link>
                  </li>
                 )
                
             
            }
          <li>
            <IoIosPhonePortrait />
            <a href="tel://7204687621">(7204) 6876 21 </a>
          </li>
          <li>
            <IoMdMail />
            <a href="mailto:contact@dukandar.io">contact@dukandar.io</a>
          </li>
        </ul>
      </div>

      <div className="social-widget">
        <a href="https://www.twitter.com" target="_blank">
          <IoLogoTwitter />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <IoLogoInstagram />
        </a>
        <a href="https://www.facebook.com" target="_blank">
          <IoLogoFacebook />
        </a>
        <a href="https://www.pinterest.com" target="_blank">
          <IoLogoPinterest />
        </a>
      </div>
    </div>
  );
};

export default MobileMenuWidgets;
