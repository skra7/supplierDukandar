import { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import { IoMdExpand, IoIosHeartEmpty } from "react-icons/io";
import { Tooltip } from "react-tippy";
import { Row, Col } from "react-bootstrap";

const ImageGalleryLeftThumb = ({
  product,
  discount
}) => {
  
  return (
    <Fragment>
      <Row className="align-items-center image-gallery-side-thumb-wrapper">
       
        <Col xl={10} className="order-1 order-xl-2">
          <div className="product-large-image-wrapper">
          <div className="single-image">
                        <img
                          src={product.imageUrl ? product.imageUrl : "/icon.jpg"}
                          className="img-fluid"
                          style={{width : "400px", height : "400px"}}
                          alt=""
                        />
                      </div>
            {/* floating badges */}
            <div className="product-large-image-wrapper__floating-badges">
              {discount && discount > 0 ? (
                <span className="onsale">-{discount}%</span>
              ) : (
                ""
              )}
              
            </div>
            {/* wishlist button */}
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ImageGalleryLeftThumb;
