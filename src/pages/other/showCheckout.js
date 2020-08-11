import { Fragment, useState } from "react";
import { Col , Button, Container, Row} from "react-bootstrap";
import Link from "next/link";
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch, IoIosCart } from "react-icons/io";
import { Tooltip } from "react-tippy";
import axios from 'axios';
import { useToasts } from "react-toast-notifications";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";

const ShowCheckout = ({}) => {  
  return (
    <LayoutTwo>
    {/* breadcrumb */}
    <BreadcrumbOne
      pageTitle={"Thank you For Ordering with us"}
      backgroundImage="/assets/images/backgrounds/cartbg.jpg"
    >
      <ul className="breadcrumb__list">
        <li>
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>Home</a>
          </Link>
        </li>
        <li>CheckOut</li>
      </ul>
    </BreadcrumbOne>
    <div className="shop-page-content__body space-mt--r130 space-mb--r130">
        <Container>
            <Row>
            <Col sm={6}>
        <h5>Manage Supplier Khata & Start Collecting Orders Online</h5>
        </Col>
        <Col sm={2}>
        <p>Download Dukandar App!</p>
        </Col>
        <Col sm={4}>
        <a
        href = "https://bit.ly/GetDukandar"
        >
        <img
              src={"/assets/images/googleplay.png"}
              className="img-fluid"
              width="200"
              height="50"
              alt="Play Store"
            />
            </a>
            </Col>
            </Row>
            </Container>
    </div>
    </LayoutTwo>
  );
};

export default ShowCheckout;
