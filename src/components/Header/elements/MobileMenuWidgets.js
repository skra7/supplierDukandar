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
import { Button } from 'react-bootstrap';

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
  },[]);
  
  const handleLogin = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("userId");
    let string = window.location.origin + "/";
          window.open(string, "_self");
  };
  return (
    <div className="offcanvas-mobile-menu__widgets">
      <div className="contact-widget space-mb--30">
        <ul>
                <li>
                
            <Button
            variant="light"
              onClick={handleLogin}
            >
              <IoIosPower /><a>Log Out</a>
            </Button>
            </li>
          <li>
            <IoMdMail />
            <a href="mailto:contact@dukandar.io">contact@dukandar.io</a>
          </li>
        </ul>
      </div>

     
    </div>
  );
};

export default MobileMenuWidgets;
